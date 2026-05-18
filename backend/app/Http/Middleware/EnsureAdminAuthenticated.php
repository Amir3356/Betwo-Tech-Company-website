<?php

namespace App\Http\Middleware;

use App\Models\AdminUser;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminAuthenticated
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken() ?: $request->header('X-Admin-Token');

        if (! $token) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $admin = AdminUser::where('api_token', $token)->first();

        if (! $admin) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $request->attributes->set('admin_user', $admin);

        return $next($request);
    }
}