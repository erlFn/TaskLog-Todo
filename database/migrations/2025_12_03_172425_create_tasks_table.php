<?php
// database/migrations/2025_12_04_000000_create_tasks_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->dateTime('due_date')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['user_id', 'status']);
            $table->index(['due_date', 'priority']);
        });

        // Update todos table to reference tasks instead of parent_data
        Schema::table('todos', function (Blueprint $table) {
            $table->dropForeign(['parent_data_id']);
            $table->renameColumn('parent_data_id', 'task_id');
            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('todos', function (Blueprint $table) {
            $table->dropForeign(['task_id']);
            $table->renameColumn('task_id', 'parent_data_id');
        });
        
        Schema::dropIfExists('tasks');
    }
};