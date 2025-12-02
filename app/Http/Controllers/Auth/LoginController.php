<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/login');
    }

    public function store(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            if (!Auth::attempt($credentials, $request->boolean('remember'))) {
                return back()->withErrors([
                    'email' => 'The provided credentials do not match our records.',
                ]);
            }

            $request->session()->regenerate();

            return redirect()->intended('/dashboard');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'An unexpected error occurred. Please try again later.'
            ]);
        }
    }
}
