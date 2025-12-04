<?php

use App\Http\Controllers\Admin\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return 'Admin Dashboard'; 
    })->name('dashboard');
    
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
});