<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    
    protected $table = 'todo';

    protected $fillable = [
        'parent_data_id',
        'name',
        'description',
        'is_completed',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
    ];

    public function parent()
    {
        return $this->belongsTo(Todo::class, 'parent_data_id');
    }
}
