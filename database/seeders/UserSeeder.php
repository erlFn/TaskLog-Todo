<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User - FIXED: Use consistent password
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@tasklog.com',
            'password' => Hash::make('password'), // Remove quotes if you want to use just "password"
            'role_id' => 1, 
        ]);

        // Create regular user
        User::create([
            'name' => 'Test User',
            'email' => 'user@tasklog.com',
            'password' => Hash::make('password'),
            'role_id' => 2,
        ]);
    }
}