<?php

namespace App\Http\Controllers;

use App\Models\Stadium;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use NunoMaduro\Collision\Adapters\Phpunit\State;

class StadiumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $stadiums = Stadium::get();

        return response()->json(['message' => 'Successfully retrieving stadiums', 'stadiums' => $stadiums,], 200); //OVDE

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
    public function store(Request $request)
    {
        //

        $validator = Validator::make($request->all(), [

            'name' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'location' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }
        $imagePath = $request->file('image')->store('public/images');

        $imageUrl = asset('api/' . str_replace('public/', '', $imagePath));

        $stadium = Stadium::create([

            'name' => $request->name,
            'image_path' => $imageUrl,
            'location' => $request->location,

        ]);

        return response()->json(['message' => 'Stadium successfully created', 'Stadium' => $stadium], 201); //OVDE
    }

    /**
     * Display the specified resource.
     */
    public function show(Stadium $stadium)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stadium $stadium)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stadium $stadium)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stadium $stadium)
    {
        //
    }


    public function getImage($imageName)
    {
        //  return $imageName;
        $imagePath = storage_path("app/public/images/{$imageName}");
        // return $imagePath;
        if (file_exists($imagePath)) {
            // return response()->file($imagePath);

            // return response()->json(['image_url' => asset("storage/images/{$imageName}")])->header('Content-Type', 'application/json; charset=utf-8');
            return response()->file($imagePath);
        } else {
            return response()->json(['message' => 'Picture not found'], 404); //OKEJ
        }
    }
}
