<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Services\TaskService;
use App\TaskStatus;
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
            $search = strtolower($request->input('search'));
            $priority = $request->input('priority');

            $filterQuery = Task::query()
                ->when($search, function ($query, $search) {
                    $query->whereRaw('LOWER(title) LIKE ?', "%{$search}%");
                })
                ->when($priority, function ($query, $priority) {
                    $query->where('priority', $priority);
                })
                ->recent();

            $tasks = (clone $filterQuery)->with(['creator'])->get();
            $tasksCount = Task::query()->count();

            $stats = [];

            foreach(TaskStatus::cases() as $status) {
                $stats[$status->value] = Task::query()
                    ->where('status', $status->value)
                    ->when($search, function ($query, $search) {
                        $query->whereRaw('LOWER(title) LIKE ?', "%{$search}%");
                    })
                    ->when($priority, function ($query, $priority) {
                        $query->where('priority', $priority);
                    })
                    ->count();
            }

            return Inertia::render('Admin/task/index', [
                'tasks' => $tasks,
                'tasksCount' => $tasksCount,
                'filters' => [
                    'search' => $search,
                    'priority' => $priority,
                ],
                'stats' => $stats,
                'taskStatus' => TaskStatus::options(),
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
                'status' => ['required', 'in:to_do,in_progress,in_review,done,closed'],
                'priority' => ['required', 'in:low,normal,high,urgent'],
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