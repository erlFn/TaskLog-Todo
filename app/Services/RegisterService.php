<?php

namespace App\Services;

use App\Models\User;
use App\RoleType;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RegisterService
{
    public function preparedData(array $data): array
    {
        return [
            'name' => Str::trim($data['name']),
            'email' => Str::trim($data['email']),
            'password' => Str::trim($data['password']),
            'role' => $this->determineUserRole($data['email']),
        ];
    }

    public function createNewUser(array $data): User
    {
        DB::beginTransaction();

        try {
            $user = User::create($data);

            DB::commit();

            return $user;
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("Failed to create new account in register service", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            throw $e;
        }
    }

    private function determineUserRole(string $email): RoleType
    {
        $adminEmails = config('auth.admin_emails', []);

        if (in_array($email, $adminEmails, true)) {
            return RoleType::ADMIN;
        }

        return RoleType::USER;
    }
}
