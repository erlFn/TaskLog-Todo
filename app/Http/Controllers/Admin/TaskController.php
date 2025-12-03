<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'status', 'priority', 'user_id']);
        $tasks = $this->taskService->getAllTasks($filters);
        $users = User::select('id', 'name', 'email')->get();
        
        return Inertia::render('Admin/task/index', [
            'tasks' => $tasks,
            'users' => $users,
            'filters' => $filters
        ]);
    }

    public function create()
    {
        $users = User::select('id', 'name', 'email')->get();
        return Inertia::render('Admin/task/create', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'priority' => ['required', 'in:low,medium,high,urgent'],
            'due_date' => ['nullable', 'date'],
        ]);

        $user = User::findOrFail($validated['user_id']);
        $task = $this->taskService->createTask($validated, $user);

        return redirect()->route('admin.tasks.index')
            ->with('success', 'Task created successfully');
    }

    public function edit(Task $task)
    {
        $users = User::select('id', 'name', 'email')->get();
        return Inertia::render('Admin/task/edit', [
            'task' => $task->load('user'),
            'users' => $users
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,in_progress,completed,cancelled'],
            'priority' => ['required', 'in:low,medium,high,urgent'],
            'due_date' => ['nullable', 'date'],
        ]);

        $this->taskService->updateTask($task, $validated);

        return redirect()->route('admin.tasks.index')
            ->with('success', 'Task updated successfully');
    }

    public function destroy(Task $task)
    {
        $this->taskService->deleteTask($task);
        
        return redirect()->route('admin.tasks.index')
            ->with('success', 'Task deleted successfully');
    }
}