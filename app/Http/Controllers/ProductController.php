<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() {
        $products = Product::all();
        return $products;
    }
    public function store(Request $request) {
        $data = $request->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        $product = Product::create($data);

        return response()->json($product);
    }
}
