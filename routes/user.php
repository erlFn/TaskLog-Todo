<?php

use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\TaskController;
use App\Http\Controllers\User\ToDoController;
use Illuminate\Support\Facades\Route;

Route::middleware('user')->prefix('user')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('user.dashboard');
    
    Route::get('/tasks', [TaskController::class, 'index'])->name('user.tasks.index');
    Route::post('/tasks', [TaskController::class, 'store'])->name('user.tasks.store');
    Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('user.tasks.update');
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('user.tasks.destroy');
    
    Route::get('/todo', [ToDoController::class, 'index'])->name('user.todo');
});