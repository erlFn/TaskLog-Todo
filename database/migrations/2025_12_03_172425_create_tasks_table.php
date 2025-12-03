<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description'); 
            $table->enum('status', ['To_Do', 'In_Progress', 'In_Review', 'Done','Closed']);
            $table->enum('priority', ['Low', 'Normal', 'High', 'Urgent']);
            $table->dateTime('date_completed')->nullable(); 
            $table->timestamps();
            
            $table->index(['created_by', 'status']);
            $table->index(['date_completed', 'priority']);
        });

        Schema::table('todos', function (Blueprint $table) {
            if (Schema::hasColumn('todos', 'parent_data_id')) {
                $table->renameColumn('parent_data_id', 'task_id');
            }
            
            if (!Schema::hasColumn('todos', 'task_id')) {
                $table->foreignId('task_id')->constrained()->onDelete('cascade');
            } else {
                $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
            }
        });
    }

    public function down(): void
    {
        Schema::table('todos', function (Blueprint $table) {
            $table->dropForeign(['task_id']);
            $table->dropColumn('task_id');
        });
        
        Schema::dropIfExists('tasks');
    }
};