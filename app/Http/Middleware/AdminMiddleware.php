<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
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
                ], 401);
            }

            return redirect()->route('welcome');
        }

        $role = Auth::user()->role?->value ?? null;
        $hasAccess = in_array($role, ['admin'], true);

        if (!$hasAccess) {
            if ($request->expectsJson() || $request->has('api/*')) {
                return response()->json([
                    'message' => 'Unauthorrized access'
                ]);
            }

            Log::warning('URL bypass attempt');

            return redirect()->route('welcome');
        }

        return $next($request);
    }
}
