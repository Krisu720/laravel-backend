<?php

use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $products = Product::all();
    
    return Inertia::render('products',['products'=>$products]);
})->name('home');

Route::get('/product/{product}',function (Product $product){
    return Inertia::render('sigle-product',['product'=>$product]);
})->name('product');

Route::get('/mainpage',function (){
    return Inertia::render('mainpage');
})->name('mainpage');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
