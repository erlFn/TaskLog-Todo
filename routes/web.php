<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

require __DIR__ . "/auth.php";

require __DIR__ . "/admin.php";

require __DIR__ . "/user.php";
