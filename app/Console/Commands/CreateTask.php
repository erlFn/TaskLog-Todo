<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

class CreateTask extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ct';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $id = 1;

        Task::create([
            'title' => 'Title #1',
            'description' => 'D1',
            'status' => 'to_do',
            'priority' => 'low',
            'created_by' => $id,
        ]);
        Task::create([
            'title' => 'Title #2',
            'description' => 'D2',
            'status' => 'in_progress',
            'priority' => 'normal',
            'created_by' => $id,
        ]);
        Task::create([
            'title' => 'Title #3',
            'description' => 'D1',
            'status' => 'in_review',
            'priority' => 'high',
            'created_by' => $id,
        ]);
        Task::create([
            'title' => 'Title #4',
            'description' => 'D1',
            'status' => 'done',
            'priority' => 'urgent',
            'created_by' => $id,
        ]);
        Task::create([
            'title' => 'Title #5',
            'description' => 'D1',
            'status' => 'closed',
            'priority' => 'normal',
            'created_by' => $id,
        ]);

        $this->info('Successfully created Tasks');
    }
}
