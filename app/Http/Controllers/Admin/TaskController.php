<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index() 
    {
        return Inertia::render('Admin/task/index');
    }
}
