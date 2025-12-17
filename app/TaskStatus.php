<?php

namespace App;

enum TaskStatus: string
{
    case TO_DO = 'to_do';
    case IN_PROGRESS = 'in_progress';
    case IN_REVIEW = 'in_review';
    case DONE = 'done';
    case CLOSED = 'closed';

    public function getLabel(): string
    {
        return match($this) {
            self::TO_DO => 'To Do',
            self::IN_PROGRESS => 'In Progress',
            self::IN_REVIEW => 'In Review',
            self::DONE => 'Done',
            self::CLOSED => 'Closed',
        };
    }

    public static function options(): array
    {
        return array_map(fn ($case) => [
            'value' => $case->value,
            'label' => $case->getLabel(),
        ], self::cases());
    }
}
