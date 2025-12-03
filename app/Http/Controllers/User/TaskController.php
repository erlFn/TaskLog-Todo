<?php
// app/Http/Controllers/User/TaskController.php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Services\TaskService;
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
        $user = Auth::user();
        $filters = $request->only(['search', 'status', 'priority', 'overdue']);
        $tasks = $this->taskService->getUserTasks($user, $filters);
        $stats = $this->taskService->getTaskStats($user);

        return Inertia::render('User/task/index', [
            'tasks' => $tasks,
            'stats' => $stats,
            'filters' => $filters
        ]);
    }

    public function create()
    {
        return Inertia::render('User/task/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'priority' => ['required', 'in:low,medium,high,urgent'],
            'due_date' => ['nullable', 'date'],
        ]);

        $task = $this->taskService->createTask($validated, Auth::user());

        return redirect()->route('user.tasks.index')
            ->with('success', 'Task created successfully');
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);
        
        $task->load(['todos' => function($query) {
            $query->orderBy('is_completed')->orderBy('created_at');
        }]);

        return Inertia::render('User/task/show', [  // Fixed: Capital T
            'task' => $task
        ]);
    }

    public function edit(Task $task)
    {
        $this->authorize('update', $task);
        
        return Inertia::render('User/task/edit', [  // Fixed: Capital T
            'task' => $task
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);
        
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,in_progress,completed,cancelled'],
            'priority' => ['required', 'in:low,medium,high,urgent'],
            'due_date' => ['nullable', 'date'],
        ]);

        $this->taskService->updateTask($task, $validated);

        return redirect()->route('user.tasks.index')
            ->with('success', 'Task updated successfully');
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        
        $this->taskService->deleteTask($task);
        
        return redirect()->route('user.tasks.index')
            ->with('success', 'Task deleted successfully');
    }

    public function complete(Task $task)
    {
        $this->authorize('update', $task);
        
        $task->complete();
        
        return back()->with('success', 'Task marked as completed');
    }
}