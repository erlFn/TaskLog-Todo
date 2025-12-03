<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\RoleType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\RedirectResponse;

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
                return back()->with(
                    'error',
                    'The provided credentials do not match our records.'
                );
            }

            $user = Auth::user();

            $request->session()->regenerate();

            return $this->redirectBasedOnRole($user->role);
        } catch (Exception $e) {
            return back()->withErrors([
                'error' => 'An unexpected error occurred. Please try again later.'
            ]);
        }
    }

    private function redirectBasedOnRole(RoleType $roleType): RedirectResponse
    {
        if ($roleType === RoleType::ADMIN) {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('welcome')->with('success', 'user');
    }
}
