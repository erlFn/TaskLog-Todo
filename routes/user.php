<?php

use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\TaskController;
use App\Http\Controllers\User\ToDoController;
use Illuminate\Support\Facades\Route;

Route::middleware('user')->name('user.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    
    Route::get('/todo', [ToDoController::class, 'index'])->name('todo');
});