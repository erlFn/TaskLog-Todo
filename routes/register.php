<?php

use App\Http\Controllers\RegisterController;
use Inertia\Inertia;


Route::post('/register', [RegisterController::class,'store']);


Route::get('/register', function () {
    return Inertia::render('Auth/register');
})->name('register');