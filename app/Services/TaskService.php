<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TaskService
{
    public function createTask(array $data, User $user): Task
    {
        DB::beginTransaction();
        
        try {
            $data['created_by'] = $user->id;
            $task = Task::create($data);
            
            DB::commit();
            
            Log::info('TaskService: Task created successfully', [
                'task_id' => $task->id,
                'user_id' => $user->id,
                'title' => $task->title
            ]);
            
            return $task;
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('TaskService: Failed to create task', [
                'user_id' => $user->id,
                'data' => $data,
                'error' => $e->getMessage()
            ]);
            
            throw $e;
        }
    }

    public function updateTask(Task $task, array $data): Task
    {
        DB::beginTransaction();
        
        try {
            $oldData = $task->toArray();
            $task->update($data);
            $updatedTask = $task->fresh();
            
            DB::commit();
            
            Log::info('TaskService: Task updated successfully', [
                'task_id' => $task->id,
                'changes' => array_diff_assoc($updatedTask->toArray(), $oldData)
            ]);
            
            return $updatedTask;
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('TaskService: Failed to update task', [
                'task_id' => $task->id,
                'data' => $data,
                'error' => $e->getMessage()
            ]);
            
            throw $e;
        }
    }

    public function deleteTask(Task $task): bool
    {
        DB::beginTransaction();
        
        try {
            $taskId = $task->id;
            $userId = $task->created_by;
            $taskTitle = $task->title;
            
            $result = $task->delete();
            
            DB::commit();
            
            Log::info('TaskService: Task deleted successfully', [
                'task_id' => $taskId,
                'user_id' => $userId,
                'title' => $taskTitle
            ]);
            
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('TaskService: Failed to delete task', [
                'task_id' => $task->id ?? 'unknown',
                'error' => $e->getMessage()
            ]);
            
            throw $e;
        }
    }

    public function buildTaskQuery(User $user, array $filters = [])
    {
        $query = $user->tasks()
            ->withCount(['todos as completed_todos_count' => function($q) {
                $q->where('is_completed', true);
            }]);
        
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
        
        return $query;
    }

    public function getTaskStatusStats(User $user): array
    {
        return [
            'completed' => $user->tasks()->where('status', 'completed')->count(),
            'pending' => $user->tasks()->where('status', 'pending')->count(),
            'in_progress' => $user->tasks()->where('status', 'in_progress')->count(),
            'cancelled' => $user->tasks()->where('status', 'cancelled')->count(),
        ];
    }
}