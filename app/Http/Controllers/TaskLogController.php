<?php

namespace App\Http\Controllers;

use App\Models\TaskLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskLogController extends Controller
{
    // Employee view - only their tasks
    public function index()
    {
        $taskLogs = TaskLog::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('TaskLogger', [
            'taskLogs' => $taskLogs,
            'isAdmin' => Auth::user()->isAdmin(),
        ]);
    }

    // Admin view - all tasks with filters
    public function adminIndex(Request $request)
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $query = TaskLog::with('user');

        // Filter by employee
        if ($request->has('employee_id') && $request->employee_id) {
            $query->where('user_id', $request->employee_id);
        }

        // Filter by date
        if ($request->has('date') && $request->date) {
            $query->whereDate('created_at', $request->date);
        }

        $taskLogs = $query->latest()->get();
        $employees = User::where('role_id', 2)->get(['id', 'name']); // Only users, not admins

        return Inertia::render('Admin/TaskLogger', [
            'taskLogs' => $taskLogs,
            'employees' => $employees,
            'filters' => $request->only(['employee_id', 'date']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:To Do,In Progress,In Review,Done,Closed',
            'priority' => 'required|in:Low,Medium,High',
        ]);

        TaskLog::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'priority' => $request->priority,
        ]);

        return redirect()->back()->with('success', 'Task created successfully.');
    }

    public function update(Request $request, TaskLog $taskLog)
    {
        // Users can only update their own tasks, admins can update any
        if (Auth::user()->isUser() && $taskLog->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:To Do,In Progress,In Review,Done,Closed',
            'priority' => 'required|in:Low,Medium,High',
        ]);

        $taskLog->update($request->all());

        return redirect()->back()->with('success', 'Task updated successfully.');
    }

    public function markAsReviewed(TaskLog $taskLog)
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $taskLog->update([
            'reviewed' => true,
            'reviewed_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Task marked as reviewed.');
    }

    public function destroy(TaskLog $taskLog)
    {
        // Only admins can delete tasks
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $taskLog->delete();

        return redirect()->back()->with('success', 'Task deleted successfully.');
    }

    // FIXED: Either remove this method or create the component
    public function show(TaskLog $taskLog)
    {
        $taskLog->load('user');

        // Users can only view their own tasks, admins can view any
        if (Auth::user()->isUser() && $taskLog->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('TaskLogDetails', [
            'taskLog' => $taskLog,
            'isAdmin' => Auth::user()->isAdmin(),
        ]);
        
    }
}