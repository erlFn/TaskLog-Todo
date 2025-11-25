<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@tasklog.com',
            'password' => Hash::make('admin1234'),
            'role_id' => 1, 
        ]);

        User::factory()->count(5)->create([
            'role_id' => 2, 
        ]);
    }
}