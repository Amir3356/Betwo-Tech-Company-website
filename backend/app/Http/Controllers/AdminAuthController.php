<?php

namespace App\Http\Controllers;

use App\Models\AdminUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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

        $token = Str::random(60);
        $admin->forceFill(['api_token' => $token])->save();

        return response()->json([
            'message' => 'Signed in successfully.',
            'data' => [
                'token' => $token,
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
        $admin = $request->attributes->get('admin_user');

        return response()->json([
            'data' => [
                'id' => $admin?->id,
                'username' => $admin?->username,
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        /** @var AdminUser|null $admin */
        $admin = $request->attributes->get('admin_user');

        if ($admin) {
            $admin->forceFill(['api_token' => null])->save();
        } elseif ($token = $request->bearerToken()) {
            DB::table('admin_users')->where('api_token', $token)->update(['api_token' => null]);
        }

        return response()->json([
            'message' => 'Signed out successfully.',
        ]);
    }
}