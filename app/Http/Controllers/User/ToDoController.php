<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ToDoController extends Controller
{
    public function index() 
    {
        return Inertia::render('User/todo/index');
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            dd($request->all());

            $validated = $request->validate([
                'title' => ['required', 'string', 'max:255']
            ]);

            dd($validated);
        } catch (ValidationException $e) {
            throw $e;
        } catch (Exception $e) {
            Log::error("There's an error in creating new todo container in controller", [
                'error' => $e->getMessage()
            ]);

            return redirect()->route('user.todo')->with('error', 'An error occured in creating new container. Please try again');
        }
    }
}
