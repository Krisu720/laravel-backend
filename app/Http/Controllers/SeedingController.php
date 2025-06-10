<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class SeedingController extends Controller
{
    public function seed(Request $request)
    {
        Artisan::call('migrate:fresh', ['--seed' => true]);
        return response()->json(['message' => 'Database seeded successfully!']);
    }
}
