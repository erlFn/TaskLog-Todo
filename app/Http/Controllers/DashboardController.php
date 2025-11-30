<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get the authenticated user
        $user = Auth::user();
        
        return Inertia::render('Dashboard', [
            'user' => [
                'isAdmin' => $user->isAdmin(),
            ],
        ]);
    }
}