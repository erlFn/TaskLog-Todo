<?php
// app/Services/TaskService.php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class TaskService
{
    public function createTask(array $data, User $user): Task
    {
        DB::beginTransaction();
        
        try {
            $task = $user->tasks()->create($data);
            
            DB::commit();
            
            return $task;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateTask(Task $task, array $data): Task
    {
        $task->update($data);
        return $task->fresh();
    }

    public function deleteTask(Task $task): bool
    {
        return $task->delete();
    }

    public function getUserTasks(User $user, array $filters = []): LengthAwarePaginator
    {
        $query = $user->tasks()->withCount(['todos as completed_todos_count' => function($q) {
            $q->where('is_completed', true);
        }]);
        
        // Apply filters
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
        
        // Overdue filter
        if (isset($filters['overdue']) && $filters['overdue']) {
            $query->where('due_date', '<', now())
                  ->where('status', '!=', 'completed');
        }
        
        // Sort
        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);
        
        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function getTaskStats(User $user): array
    {
        return [
            'total' => $user->tasks()->count(),
            'completed' => $user->tasks()->where('status', 'completed')->count(),
            'pending' => $user->tasks()->where('status', 'pending')->count(),
            'in_progress' => $user->tasks()->where('status', 'in_progress')->count(),
            'overdue' => $user->tasks()
                ->where('due_date', '<', now())
                ->where('status', '!=', 'completed')
                ->count(),
        ];
    }
}