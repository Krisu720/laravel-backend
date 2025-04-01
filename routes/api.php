<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/test', function () {
    return response()->json(['message'=>'Hello World!']);
});
Route::resource('products', ProductController::class);
Route::resource('categories',CategoryController::class);
