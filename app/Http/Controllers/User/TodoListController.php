<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use App\Models\TodoList;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class TodoListController extends Controller
{
    public function store(Request $request, Todo $todo) 
    {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'description' => ['required', 'string', 'max:255'],
            ]);

            TodoList::create([
                'description' => $validated['description'],
                'todo_id' => $todo->getKey(),
                'status' => false,
            ]);

            DB::commit();

            return redirect()->back();
        } catch (ValidationException $e) {
            throw $e;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("There's an error in creating new todo list in controller", [
                'error' => $e->getMessage()
            ]);

            return redirect()->back();
        }
    }

    public function update(Request $request, Todo $todo, TodoList $todoList)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'status' => ['required', 'boolean']
            ]);

            $todoList->update($validated);
            
            DB::commit();

            return redirect()->back();
        } catch (ValidationException $e) {
            throw $e;
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("There's an error in updating todo list in controller", [
                'error' => $e->getMessage(),
                'todo_id' => $todo->getKey(),
                'todo_list_id' => $todoList->getKey(),
            ]);

            return redirect()->back();
        }
    }

    public function destroy(Todo $todo, TodoList $todoList) 
    {
        try {
            $todoList->delete();

            return redirect()->back();
        } catch (Exception $e) {
            Log::error("There's an error in deleting todo list", [
                'error' => $e->getMessage(),
                'todo_id' => $todo->getKey(),
                'todo_list_id' => $todoList->getKey(),
            ]);

            return redirect()->back();
        }
    }
}
