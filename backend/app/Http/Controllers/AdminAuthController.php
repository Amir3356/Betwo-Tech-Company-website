<?php

namespace App\Http\Controllers;

use App\Models\AdminUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $admin = AdminUser::where('username', $validated['username'])->first();

        if (! $admin || ! Hash::check($validated['password'], $admin->password)) {
            return response()->json([
                'message' => 'Invalid username or password.',
            ], 422);
        }

        Auth::guard('admin')->login($admin);

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Signed in successfully.',
            'data' => [
                'admin' => [
                    'id' => $admin->id,
                    'username' => $admin->username,
                ],
            ],
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        /** @var AdminUser|null $admin */
        $admin = Auth::guard('admin')->user();

        if (! $admin) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        return response()->json([
            'data' => [
                'id' => $admin->id,
                'username' => $admin->username,
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Signed out successfully.',
        ]);
    }
}