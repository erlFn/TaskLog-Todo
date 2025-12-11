<?php

use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\TaskController;
use App\Http\Controllers\User\ToDoController;
use App\Http\Controllers\User\TodoListController;
use Illuminate\Support\Facades\Route;

Route::middleware('user')->name('user.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::post('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    
    Route::get('/todo', [ToDoController::class, 'index'])->name('todo');
    Route::post('/todo', [ToDoController::class, 'store'])->name('todo.store');
    Route::get('/todo/{todo:slug}', [ToDoController::class, 'view'])->name('todo.view');
    Route::post('/todo/{todo}', [ToDoController::class, 'destroy'])->name('todo.delete');
    Route::post('/todo/{todo}/store', [TodoListController::class, 'store'])->name('todo.list.store');
    Route::put('/todo/{todo}/{todoList}/update', [TodoListController::class, 'update'])->name('todo.list.update');
    Route::post('/todo/{todo}/{todoList}/delete', [TodoListController::class, 'destroy'])->name('todo.list.delete');
});