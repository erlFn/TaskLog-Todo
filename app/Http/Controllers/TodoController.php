<?php

namespace App\Http\Controllers;

use App\Models\TodoParent;
use App\Models\TodoItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TodoController extends Controller
{
    // Employee view - only their todos
    public function index()
    {
        $todoParents = TodoParent::with(['items' => function($query) {
            $query->orderBy('created_at', 'asc');
        }])
        ->where('user_id', Auth::id())
        ->latest()
        ->get();

        return Inertia::render('TodoList', [
            'todoParents' => $todoParents,
            'isAdmin' => Auth::user()->isAdmin(),
        ]);
    }

    // Admin view - all todos
    public function adminIndex()
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $todoParents = TodoParent::with(['user', 'items' => function($query) {
            $query->orderBy('created_at', 'asc');
        }])
        ->latest()
        ->get();

        return Inertia::render('Admin/TodoList', [
            'todoParents' => $todoParents,
        ]);
    }

    public function storeParent(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $todoParent = TodoParent::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Todo list created successfully.');
    }

    public function storeItem(Request $request, TodoParent $todoParent)
    {
        // Users can only add to their own todo parents
        if (Auth::user()->isUser() && $todoParent->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'text' => 'required|string|max:255',
            'category' => 'required|string|max:255',
        ]);

        $todoParent->items()->create([
            'text' => $request->text,
            'category' => $request->category,
            'important' => $request->important ?? false,
        ]);

        return redirect()->back()->with('success', 'Todo item added successfully.');
    }

    public function updateItem(Request $request, TodoItem $todoItem)
    {
        // Users can only update their own items, admins can update any
        if (Auth::user()->isUser() && $todoItem->parent->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'text' => 'required|string|max:255',
            'completed' => 'boolean',
            'important' => 'boolean',
            'category' => 'required|string|max:255',
        ]);

        $todoItem->update($request->all());

        return redirect()->back()->with('success', 'Todo item updated successfully.');
    }

    public function destroyParent(TodoParent $todoParent)
    {
        // Only admins can delete todo parents
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $todoParent->delete();

        return redirect()->back()->with('success', 'Todo list deleted successfully.');
    }

    public function destroyItem(TodoItem $todoItem)
    {
        // Users can only delete their own items, admins can delete any
        if (Auth::user()->isUser() && $todoItem->parent->user_id !== Auth::id()) {
            abort(403);
        }

        $todoItem->delete();

        return redirect()->back()->with('success', 'Todo item deleted successfully.');
    }
}