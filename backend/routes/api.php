<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->group(function () {
    Route::post('/admin/login', [AdminAuthController::class, 'login']);
    Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
});

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

Route::middleware(['web', 'admin.auth'])->group(function () {
    Route::get('/admin/me', [AdminAuthController::class, 'me']);
    Route::get('/contact-messages', [ContactMessageController::class, 'index']);
    Route::delete('/contact-messages/{id}', [ContactMessageController::class, 'destroy']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
});

Route::post('/contact-messages', [ContactMessageController::class, 'store']);