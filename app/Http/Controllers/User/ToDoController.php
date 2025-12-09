<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use App\Services\TodoService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ToDoController extends Controller
{
    public function __construct(
        private TodoService $todoService,
    ){}

    public function index() 
    {
        $user = Auth::user();

        $todos = Todo::query()
            ->ownedBy($user->id)
            ->with(['lists', 'creator'])
            ->get();

        return Inertia::render('User/todo/index', [
            'todos' => $todos
        ]);
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            $validated = $request->validate([
                'title' => ['required', 'string', 'max:255']
            ]);

            $existingTitle = $this->todoService->existingTitle($validated['title']);

            if ($existingTitle) { 
                throw ValidationException::withMessages([
                    'title' => 'Title already exist, try a different title'
                ]);
            }

            $createdTodo = $this->todoService->createTodoContainer($validated, $user);

            if (!$createdTodo) {
                Log::error('Fail to create new todo container', [
                    'user_id' => $user->id,
                    'todo_title' => $validated['title']
                ]);
            }

            return redirect()->route('user.todo');
        } catch (ValidationException $e) {
            throw $e;
        } catch (Exception $e) {
            Log::error("There's an error in creating new todo container in controller", [
                'error' => $e->getMessage()
            ]);

            return redirect()->route('user.todo')->with('error', 'An error occured in creating new container. Please try again');
        }
    }

    public function view(Todo $todo) 
    {
        $todo->load(['lists', 'creator']);

        return Inertia::render('User/todo/show', [
            'todo' => $todo,
        ]);
    }
}
