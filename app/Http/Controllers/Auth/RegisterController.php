<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\RoleType;
use Illuminate\Http\Request;
use App\Services\RegisterService;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\RedirectResponse;

class RegisterController extends Controller
{
    public function __construct(
        private RegisterService $registerService,
    ) {}

    public function index()
    {
        return Inertia::render('Auth/register');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'unique:users'],
                'password' => ['required', 'confirmed', 'min:8'],
            ]);

            $preparedData = $this->registerService->preparedData($validated);
            $user = $this->registerService->createNewUser($preparedData);

            Auth::login($user);
            $request->session()->regenerate();

            return $this->redirectBasedOnRole($user->role);
        } catch (ValidationException $e) {
            throw $e;
        } catch (Exception $e) {
            Log::error("Failed to create new account in controller", [
                'error' => $e->getMessage()
            ]);

            return redirect()->route('welcome')->with('error', "There's an error in creating an account");
        }
    }

    private function redirectBasedOnRole(RoleType $roleType): RedirectResponse
    {
        if ($roleType === RoleType::ADMIN) {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('user.dashboard');
    }
}
