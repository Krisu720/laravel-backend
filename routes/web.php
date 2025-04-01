<?php

use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/products',function (){
    $products = Product::all();

    return Inertia::render('products',['products'=>$products]);
});
Route::get('/productsaa',function (){

    return Inertia::render('sigle-product');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
