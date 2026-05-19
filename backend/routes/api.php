<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

Route::middleware('admin.auth')->group(function () {
	Route::get('/admin/me', [AdminAuthController::class, 'me']);
	Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
	Route::get('/contact-messages', [ContactMessageController::class, 'index']);
	Route::post('/projects', [ProjectController::class, 'store']);
	Route::put('/projects/{project}', [ProjectController::class, 'update']);
	Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
});

Route::post('/contact-messages', [ContactMessageController::class, 'store']);