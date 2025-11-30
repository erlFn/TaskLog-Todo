<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TaskLogController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

// Login Routes 
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

// Register Routes 
Route::get('/register', [RegisterController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register'])->name('register.post');

// Protected Routes (Require Authentication)
Route::middleware('auth')->group(function () {
    
    // Dashboard Routes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Admin Dashboard Route
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    // Task Logger Routes
    Route::get('/tasklogger', [TaskLogController::class, 'index'])->name('tasklogger');
    Route::post('/tasklogger', [TaskLogController::class, 'store'])->name('tasklogger.store');
    Route::put('/tasklogger/{taskLog}', [TaskLogController::class, 'update'])->name('tasklogger.update');
    Route::delete('/tasklogger/{taskLog}', [TaskLogController::class, 'destroy'])->name('tasklogger.destroy');
    Route::get('/tasklogger/{taskLog}', [TaskLogController::class, 'show'])->name('tasklogger.show');
    
    // Task Logger Admin Routes
    Route::get('/admin/tasklogger', [TaskLogController::class, 'adminIndex'])->name('admin.tasklogger');
    Route::post('/tasklogger/{taskLog}/review', [TaskLogController::class, 'markAsReviewed'])->name('tasklogger.review');

    // Todo List Routes
    Route::get('/todolist', [TodoController::class, 'index'])->name('todolist');
    Route::post('/todolist/parent', [TodoController::class, 'storeParent'])->name('todolist.parent.store');
    Route::post('/todolist/item', [TodoController::class, 'storeItem'])->name('todolist.item.store');
    Route::put('/todolist/item/{todoItem}', [TodoController::class, 'updateItem'])->name('todolist.item.update');
    Route::delete('/todolist/item/{todoItem}', [TodoController::class, 'destroyItem'])->name('todolist.item.destroy');
    
    // Todo List Admin Routes
    Route::get('/admin/todolist', [TodoController::class, 'adminIndex'])->name('admin.todolist');
    Route::delete('/todolist/parent/{todoParent}', [TodoController::class, 'destroyParent'])->name('todolist.parent.destroy');

    // Logout 
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
});