<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\ToDoController;
use Illuminate\Support\Facades\Route;

Route::middleware('admin')->prefix('/admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks');
    Route::get('/todo', [ToDoController::class, 'index'])->name('todo');
});
