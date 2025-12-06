<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by',
        'title',
        'description',
        'status',
        'priority'
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeOwnedBy(Builder $query, int $userId): Builder
    {
        return $query->where('created_by', $userId);
    }

    public function scopeRecent(Builder $query): Builder
    {
        return $query->orderByDesc('created_at');
    }
}