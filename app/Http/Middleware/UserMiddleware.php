<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            if ($request->expectsJson() || $request->has('api/*')) {
                return response()->json([
                    'message' => 'Unauthorized access'
                ]);
            }

            return redirect()->route('welcome')
                ->with('error', 'Unauthorized access, sign in first to access the page');
        }

        return $next($request);
    }
}
