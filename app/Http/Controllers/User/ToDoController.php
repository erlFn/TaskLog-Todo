<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ToDoController extends Controller
{
    public function index()
    {
        return Inertia::render('User/todo/index', [
            'todos' => Todo::where('user_id', auth()->id())->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Todo::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => auth()->id(),
            'parent_data_id' => $request->parent_data_id,
        ]);

        return back();
    }

    public function update(Request $request, Todo $todo)
    {
        $todo->update($request->only(['name', 'description']));

        return back();
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();

        return back();
    }

    public function toggleComplete(Todo $todo)
    {
        $todo->is_completed = !$todo->is_completed;
        $todo->save();

        return back();
    }
}
