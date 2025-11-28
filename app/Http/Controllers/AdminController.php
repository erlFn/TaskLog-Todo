<?php

namespace App\Http\Controllers;

use App\Models\TaskLog;
use App\Models\TodoParent;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    // Admin Dashboard
public function dashboard()
{
    if (!Auth::user()->isAdmin()) {
        abort(403);
    }

    $totalUsers = User::where('role_id', 2)->count();
    $totalTasks = TaskLog::count();
    $totalTodoLists = TodoParent::count();
    $pendingReviews = TaskLog::where('reviewed', false)->count();

    return Inertia::render('Admin/Dashboard', [
        'user' => [
            'isAdmin' => Auth::user()->isAdmin(),
        ],
        'stats' => [
            'totalUsers' => $totalUsers,
            'totalTasks' => $totalTasks,
            'totalTodoLists' => $totalTodoLists,
            'pendingReviews' => $pendingReviews,
        ],
    ]);
}

    // Admin Task Logger
    public function taskLogger(Request $request)
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $query = TaskLog::with('user');

        // Filter by employee
        if ($request->has('employee_id') && $request->employee_id) {
            $query->where('user_id', $request->employee_id);
        }

        // Filter by date
        if ($request->has('date') && $request->date) {
            $query->whereDate('created_at', $request->date);
        }

        $taskLogs = $query->latest()->get();
        $employees = User::where('role_id', 2)->get(['id', 'name']);

        return Inertia::render('Admin/TaskLogger', [
            'taskLogs' => $taskLogs,
            'employees' => $employees,
            'filters' => $request->only(['employee_id', 'date']),
        ]);
    }

    // Admin Todo List
    public function todoList()
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $todoParents = TodoParent::with(['user', 'items' => function($query) {
            $query->orderBy('created_at', 'asc');
        }])
        ->latest()
        ->get();

        return Inertia::render('Admin/TodoList', [
            'todoParents' => $todoParents,
        ]);
    }
}