<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\PasswordController;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/products', function () {
    $products = Product::all();
    
    return Inertia::render('products',['products'=>$products]);
})->name('home');

Route::get('/products/{product}',function (Product $product){
    return Inertia::render('sigle-product',['product'=>$product]);
})->name('product');

Route::get('/',function (){
    return Inertia::render('mainpage');
})->name('mainpage');

Route::middleware(['auth'])->group(function () {
    Route::get('konto', function () {
        $orders = Order::where('user_id', Auth::id())->with('items')->get();
        return Inertia::render('konto',['orders'=>$orders]);
    })->name('konto');

    Route::put('/password', [PasswordController::class, 'update'])->name('password.update');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
