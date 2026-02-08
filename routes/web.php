<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', [PostController::class, 'index']);
// Route::resource('/posts', PostController::class)->except('index');


Route::get('/', [ExpenseController::class, 'index']);
Route::resource('/expenses', ExpenseController::class)->except('index');