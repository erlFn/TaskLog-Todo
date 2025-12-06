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
            $table->enum('status', ['To Do', 'In Progress', 'In Review', 'Done', 'Closed']);
            $table->enum('priority', ['Low', 'Normal', 'High', 'Urgent']);
            $table->timestamps();
            
            $table->index(['created_by', 'status']);
            $table->index('priority');
            $table->index('title');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};