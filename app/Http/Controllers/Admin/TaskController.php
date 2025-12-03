<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ) {}

    public function index(Request $request)
    {
        try {
            $filters = $request->only(['search', 'status', 'priority', 'user_id']);
            
            $query = Task::with('creator');
            
            if (!empty($filters['user_id'])) {
                $query->where('created_by', $filters['user_id']);
            }
            
            if (!empty($filters['status'])) {
                $query->where('status', $filters['status']);
            }
            
            if (!empty($filters['priority'])) {
                $query->where('priority', $filters['priority']);
            }
            
            if (!empty($filters['search'])) {
                $query->where(function($q) use ($filters) {
                    $q->where('title', 'like', "%{$filters['search']}%")
                      ->orWhere('description', 'like', "%{$filters['search']}%");
                });
            }
            
            $tasks = $query->latest()->paginate(15);
            $users = User::select('id', 'name', 'email')->get();

            Log::info('Admin viewed tasks list', [
                'admin_id' => Auth::id(),
                'filters' => $filters,
                'task_count' => $tasks->total()
            ]);

            return Inertia::render('Admin/task/index', [
                'tasks' => $tasks,
                'users' => $users,
                'filters' => $filters
            ]);
            
        } catch (\Exception $e) {
            Log::error('Admin failed to view tasks list', [
                'admin_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Failed to load tasks. Please try again.');
        }
    }

    public function update(Request $request, Task $task)
    {
        try {
            $validated = $request->validate([
                'title' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string'],
                'status' => ['required', 'in:pending,in_progress,completed,cancelled'],
                'priority' => ['required', 'in:low,medium,high,urgent'],
            ]);

            $oldTask = $task->toArray();
            
            $updatedTask = $this->taskService->updateTask($task, $validated);
            
            Log::info('Admin updated task successfully', [
                'admin_id' => Auth::id(),
                'task_id' => $updatedTask->id,
                'user_id' => $updatedTask->created_by,
                'changes' => array_diff_assoc($updatedTask->toArray(), $oldTask)
            ]);

            return redirect()->route('admin.tasks.index')
                ->with('success', 'Task updated successfully');
                
        } catch (\Exception $e) {
            Log::error('Admin failed to update task', [
                'admin_id' => Auth::id(),
                'task_id' => $task->id ?? 'unknown',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()
                ->withInput()
                ->with('error', 'Failed to update task. Please try again.');
        }
    }

    public function destroy(Task $task)
    {
        try {
            $taskId = $task->id;
            $userId = $task->created_by;
            $taskTitle = $task->title;
            
            $this->taskService->deleteTask($task);
            
            Log::info('Admin deleted task successfully', [
                'admin_id' => Auth::id(),
                'task_id' => $taskId,
                'user_id' => $userId,
                'title' => $taskTitle
            ]);
            
            return redirect()->route('admin.tasks.index')
                ->with('success', 'Task deleted successfully');
                
        } catch (\Exception $e) {
            Log::error('Admin failed to delete task', [
                'admin_id' => Auth::id(),
                'task_id' => $task->id ?? 'unknown',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Failed to delete task. Please try again.');
        }
    }
}