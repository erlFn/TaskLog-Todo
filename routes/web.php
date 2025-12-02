<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Admin/task/index');
})->name('welcome');


require __DIR__ . '/register.php';
