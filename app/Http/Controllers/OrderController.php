<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

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
        try {
            DB::beginTransaction();

            $orderData = [
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'email' => $request->email,
                'phone' => $request->phone,
                'street' => $request->street,
                'postal_code' => $request->postalCode,
                'city' => $request->city,
            ];

            // Jeśli użytkownik jest zalogowany, dodaj jego ID
            if (auth()->check()) {
                $orderData['user_id'] = auth()->id();
            }

            $order = Order::create($orderData);

            foreach ($request->products as $item) {
                $product = Product::find($item['id']);
                
                $order->items()->create([
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_price' => $product->price,
                    'quantity' => $item['quantity']
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Zamówienie zostało utworzone',
                'order' => $order->load('items')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Wystąpił błąd podczas tworzenia zamówienia',
                'error' => $e->getMessage()
            ], 500);
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
