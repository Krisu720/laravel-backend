<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
class ProductImageController extends Controller
{
    public function upload(Request $request, Product $product)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::delete('public/' . $product->image);
            }

            $path = $request->file('image')->store('products', 'public'); //storage save
            
            $product->update(['image' => $path]); //db update
        }

        return response()->json(['image_url' => $product->image_url]);
    }
}
