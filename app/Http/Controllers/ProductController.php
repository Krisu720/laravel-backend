<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() {
        $products = Product::with('category')->get();
        return $products;
    }
    public function store(Request $request) {
        $data = $request->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'category_id' => ['required', 'exists:categories,id'],
        ]);

        $product = Product::create($data);

        return response()->json($product);
    }

    public function show($id) {
        $product = Product::find($id);

        return response()->json($product);
    }

    public function destroy($id) {
        $product = Product::find($id);
        if(!$product) {
            return response()->json(["message"=>"not found"],404);
        }
        $product->delete();
        return response()->json($product);
    }
}
