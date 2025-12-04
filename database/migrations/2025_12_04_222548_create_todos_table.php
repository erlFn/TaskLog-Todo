<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_data_id')
                ->constrained('parent_data') // specify singular table name
                ->onDelete('cascade');


            $table->string('name');              
            $table->text('description')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->timestamps();                  
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};


