<?php

use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::post('/register', [RegisterController::class,'store']);


Route::get('/register', function () {
    return Inertia::render('Auth/register');
})->name('register');