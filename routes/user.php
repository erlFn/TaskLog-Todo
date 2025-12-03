<?php

use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\TaskController;
use App\Http\Controllers\User\ToDoController;
use Illuminate\Support\Facades\Route;

Route::middleware('user')->name('user.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks');
    Route::get('/todo', [ToDoController::class, 'index'])->name('todo');
});