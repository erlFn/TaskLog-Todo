<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Services\TaskService;
use Exception;
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
            $filters = $request->only(['search', 'status', 'priority']);
            
            $query = Task::with('creator');
            
            if (!empty($filters['status'])) {
                $query->where('status', $filters['status']);
            }
            
            if (!empty($filters['priority'])) {
                $query->where('priority', $filters['priority']);
            }
            
            if (!empty($filters['search'])) {
                $query->where('title', 'like', "%{$filters['search']}%");
            }
            
            $tasks = $query->latest()->paginate(15);

            return Inertia::render('Admin/task/index', [
                'tasks' => $tasks,
                'filters' => $filters
            ]);
            
        } catch (Exception $e) {
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
                'description' => ['required', 'string', 'max:1000'],
                'status' => ['required', 'in:To Do,In Progress,In Review,Done,Closed'],
                'priority' => ['required', 'in:Low,Normal,High,Urgent'],
            ]);

            $this->taskService->updateTask($task, $validated);

            return redirect()->route('admin.tasks.index')
                ->with('success', 'Task updated successfully');
                
        } catch (Exception $e) {
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
            $this->taskService->deleteTask($task);
            
            return redirect()->route('admin.tasks.index')
                ->with('success', 'Task deleted successfully');
                
        } catch (Exception $e) {
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