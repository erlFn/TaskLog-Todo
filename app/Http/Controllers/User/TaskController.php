<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Services\TaskService;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TaskController extends Controller
{
    use AuthorizesRequests;
    
    public function __construct(
        private TaskService $taskService
    ) {}

    public function index(Request $request)
    {
        try {
            $user = Auth::user();
            $filters = $request->only(['search', 'priority']);
            
            $query = $this->taskService->buildTaskQuery($user, $filters);
            $query->orderByDesc('created_at');
            
            $tasks = $query->paginate(15);
            $stats = $this->taskService->getTaskStatusStats($user);

            return Inertia::render('User/task/index', [
                'tasks' => $tasks,
                'stats' => $stats,
                'filters' => $filters
            ]);
        } catch (Exception $e) {
            Log::error('User failed to view tasks list', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Failed to load tasks. Please try again.');
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:1000'],
                'priority' => ['required', 'in:low,normal,high,urgent'],
            ]);

            $this->taskService->createTask($validated, Auth::user());

            return redirect()->route('user.tasks')
                ->with('success', 'Task created successfully');
                
        } catch (Exception $e) {
            Log::error('User failed to create task', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()
                ->withInput()
                ->with('error', 'Failed to create task. Please try again.');
        }
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);
        
        try {
            $validated = $request->validate([
                'title' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:1000'],
                'status' => ['required', 'in:to_do,in_progress,in_review,done,closed'],
                'priority' => ['required', 'in:low,normal,high,urgent'],
            ]);

            $this->taskService->updateTask($task, $validated);

            return redirect()->route('user.tasks.index')
                ->with('success', 'Task updated successfully');
                
        } catch (Exception $e) {
            Log::error('User failed to update task', [
                'user_id' => Auth::id(),
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
        $this->authorize('delete', $task);
        
        try {
            $this->taskService->deleteTask($task);
            
            return redirect()->route('user.tasks.index')
                ->with('success', 'Task deleted successfully');
                
        } catch (Exception $e) {
            Log::error('User failed to delete task', [
                'user_id' => Auth::id(),
                'task_id' => $task->id ?? 'unknown',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Failed to delete task. Please try again.');
        }
    }
}