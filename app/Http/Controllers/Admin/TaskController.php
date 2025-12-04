<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use App\Services\TaskService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

            return Inertia::render('Admin/task/index', [
                'tasks' => $tasks,
                'filters' => $filters
            ]);
            
        } catch (Exception $e) {
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

            $updatedTask = $this->taskService->updateTask($task, $validated);

            return redirect()->route('admin.tasks.index')
                ->with('success', 'Task updated successfully');
                
        } catch (Exception $e) {
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
            return back()
                ->with('error', 'Failed to delete task. Please try again.');
        }
    }
}