<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Todo;
use App\Models\TodoList;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $tasks = Task::with(['creator'])
            ->simplePaginate(5);

        $tasksCount = Task::query()
            ->count();

        return Inertia::render('Admin/dashboard', [
            'tasks' => $tasks,
            'tasksCount' => $tasksCount,
        ]);
    }
}
