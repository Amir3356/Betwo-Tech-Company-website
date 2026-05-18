<?php

use App\Http\Controllers\ContactMessageController;
use Illuminate\Support\Facades\Route;

Route::get('/contact-messages', [ContactMessageController::class, 'index']);
Route::post('/contact-messages', [ContactMessageController::class, 'store']);