<?php

use App\Http\Controllers\ContactMessageController;
use Illuminate\Support\Facades\Route;

Route::post('/contact-messages', [ContactMessageController::class, 'store']);