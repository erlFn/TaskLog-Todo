<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ClearLogsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cl';

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
        // exec('echo "" > ' . storage_path('logs/laravel.log'));
        file_put_contents(storage_path('logs/laravel.log'), '');
        $this->info('Laravel Logs Cleared');
    }
}
