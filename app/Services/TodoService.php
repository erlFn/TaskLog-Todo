<?php

namespace App\Services;

use App\Models\Todo;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TodoService
{
    public function createTodoContainer(array $data, User $user): Todo
    {
        DB::beginTransaction();
        try {
            $preparedData = $this->preparedData($data, $user->getKey());

            $todo = Todo::create($preparedData);
            
            DB::commit();

            return $todo;
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("Failed to create new todo container in service", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            throw $e;
        }
    }
    
    public function existingTitle(string $title): bool
    {
        return Todo::query()
            ->where('title', $title)
            ->exists();
    }

    private function preparedData(array $data, int $userId) : array
    {
        return [
            'title' => $data['title'],
            'slug' => Str::slug($data['title']),
            'created_by' => $userId
        ];
    }
}
