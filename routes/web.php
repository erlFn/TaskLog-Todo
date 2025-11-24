<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;
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
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/tasklogger', function () {
        return Inertia::render('TaskLogger');
    })->name('tasklogger');

    Route::get('/todolist', function () {
        return Inertia::render('TodoList');
    })->name('todolist');

    // Logout 
    Route::post('/logout`', [AuthController::class, 'logout'])->name('logout');
});