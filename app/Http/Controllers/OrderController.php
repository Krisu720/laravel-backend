<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateOrderRequest $request): JsonResponse
    {
        $validated = $request->validated();
        
        try {
            $result = DB::transaction(function () use ($validated, $request) {
                $order = Order::create([
                    'address' => $validated['address'],
                    'phone' => $validated['phone'],
                    'email' => $validated['email'],
                    'note' => $validated['note'] ?? null,
                    'user_id' => $request->user()->id,
                    'status' => 'pending'
                ]);

                foreach ($validated['items'] as $item) {
                    $product = Product::findOrFail($item['product_id']);
                    
                    $order->items()->create([
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'product_price' => $product->price,
                        'quantity' => $item['quantity']
                    ]);
                }

                return $order->load('items');
            });

            return response()->json($result, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create order'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
