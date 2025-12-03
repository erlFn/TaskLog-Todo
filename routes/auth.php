<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [LoginController::class, 'index'])->name('auth.login');
Route::post('/login', [LoginController::class, 'store'])->name('auth.login.store');

Route::get('/register', [RegisterController::class, 'index'])->name('auth.register');
Route::post('/register', [RegisterController::class, 'store'])->name('auth.register.store');

Route::middleware('auth')->group(function () {
    Route::post('/logout', LogoutController::class)->name('auth.logout');
});
