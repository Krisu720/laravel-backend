<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use Illuminate\Support\Facades\Route;

Route::post('/test', function () {
    return response()->json(['message'=>'Hello World!']);
});

Route::resource('products', ProductController::class);
Route::resource('categories', CategoryController::class);
Route::post('/products/{product}/image', [ProductImageController::class, 'upload'])->name('products.image.upload');

Route::middleware('auth')->group(function () {
    Route::resource('orders', OrderController::class);
});
