<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
// use App\Http\Requests\Task\StoreTaskRequest;
// use App\Http\Requests\Task\UpdateTaskRequest;
use App\Models\Task;
use App\Services\TaskService;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            
            $tasks = $query->paginate($filters['per_page'] ?? 15);
            $stats = $this->taskService->getTaskStatusStats($user);

            return Inertia::render('User/task/index', [
                'tasks' => $tasks,
                'stats' => $stats,
                'filters' => $filters
            ]);
            
        } catch (Exception $e) {
            return back()
                ->with('error', 'Failed to load tasks. Please try again.');
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validated();
            $task = $this->taskService->createTask($validated, Auth::user());

            return redirect()->route('user.tasks.index')
                ->with('success', 'Task created successfully');
                
        } catch (Exception $e) {
            return back()
                ->withInput()
                ->with('error', 'Failed to create task. Please try again.');
        }
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);
        
        try {
            $validated = $request->validated();
            $updatedTask = $this->taskService->updateTask($task, $validated);

            return redirect()->route('user.tasks.index')
                ->with('success', 'Task updated successfully');
                
        } catch (Exception $e) {
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
            return back()
                ->with('error', 'Failed to delete task. Please try again.');
        }
    }
}