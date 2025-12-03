<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ToDoController extends Controller
{
    public function index() 
    {
        return Inertia::render('Admin/todo/index');
    }
}
