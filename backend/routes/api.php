<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ContactMessageController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::middleware('admin.auth')->group(function () {
	Route::get('/admin/me', [AdminAuthController::class, 'me']);
	Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
	Route::get('/contact-messages', [ContactMessageController::class, 'index']);
});

Route::post('/contact-messages', [ContactMessageController::class, 'store']);