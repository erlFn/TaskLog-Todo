<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use App\Models\User;
use App\RoleType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ToDoController extends Controller
{
    public function index(Request $request) 
    {
        $search = $request->input('search');

        $users = User::query()
            ->where('role', RoleType::USER->value)
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->whereRaw('LOWER(name) LIKE ?', "%{$search}%");
                });
            })
            ->with(['todos.creator', 'todos.lists'])
            ->get();

        return Inertia::render('Admin/todo/index', [
            'users' => $users,
            'search' => $search,
        ]);
    }

    public function view(Todo $todo)
    {
        $todo->load([
            'lists' => fn ($q) => (
                $q->orderBy('created_at', 'asc')
            ),
            'creator'
        ]);

        return Inertia::render('Admin/todo/show', [
            'todo' => $todo,
        ]);
    }
}
