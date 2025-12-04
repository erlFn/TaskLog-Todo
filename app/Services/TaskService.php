<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use Exception;
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
        } catch (Exception $e) {
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
        } catch (Exception $e) {
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
            $result = $task->delete();
            
            DB::commit();
            
            Log::info('TaskService: Task deleted successfully', [
                'task_id' => $task->id
            ]);
            
            return $result;
        } catch (Exception $e) {
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
        $query = $user->tasks();
        
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        
        if (!empty($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }
        
        if (!empty($filters['search'])) {
            $query->where('title', 'like', "%{$filters['search']}%");
        }
        
        return $query;
    }

    public function getTaskStatusStats(User $user): array
    {
        return [
            'To Do' => $user->tasks()->where('status', 'To Do')->count(),
            'IN Progress' => $user->tasks()->where('status', 'In Progress')->count(),
            'In Review' => $user->tasks()->where('status', 'In Review')->count(),
            'Done' => $user->tasks()->where('status', 'Done')->count(),
            'Closed' => $user->tasks()->where('status', 'Closed')->count(),
        ];
    }
}