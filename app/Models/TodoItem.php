<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TodoItem extends Model
{
    protected $fillable = [
        'todo_parent_id',
        'text',
        'completed',
        'important',
        'category'
    ];

    protected $casts = [
        'completed' => 'boolean',
        'important' => 'boolean',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(TodoParent::class, 'todo_parent_id');
    }
}