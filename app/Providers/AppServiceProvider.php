<?php

namespace App\Providers;

use App\Services\RegisterService;
use App\Services\TaskService;
use App\Services\TodoService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(RegisterService::class, function ($app) {
            return new RegisterService();
        });

        $this->app->singleton(TaskService::class, function ($app) {
            return new TaskService();
        });

        $this->app->singleton(TodoService::class, function($app) {
            return new TodoService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
