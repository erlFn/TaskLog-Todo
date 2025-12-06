<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() 
    {
        $tasks = Task::query()
            ->ownedBy(Auth::id())
            ->recent()
            ->simplePaginate(5);

        $taskCount = Task::query()
            ->ownedBy(Auth::id())
            ->count();

        return Inertia::render('User/dashboard', [
            'tasks' => $tasks,
            'taskCount' => $taskCount,
        ]);
    }
}
