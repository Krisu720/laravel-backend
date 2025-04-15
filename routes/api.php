<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductImageController;

Route::post('/test', function () {
    return response()->json(['message'=>'Hello World!']);
});

Route::resource('products', ProductController::class);
Route::resource('categories',CategoryController::class);
Route::post('/products/{product}/image', [ProductImageController::class, 'upload'])->name('products.image.upload');
