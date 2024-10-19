<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::get();

        return response()->json(['message' => 'Successfully retrieving teams', 'teams' => $teams,], 200); //OVDE
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

            'name' => 'required|min:1',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'group_id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $imagePath = $request->file('image')->store('public/images');

        $imageUrl = asset('api/' . str_replace('public/', '', $imagePath));

        $team = Team::create([

            'name' => $request->name,
            'image_path' => $imageUrl,
            'group_id' => $request->group_id

        ]);

        return response()->json(['message' => 'Team successfully created', 'Team' => $team], 201); //OVDE
    }

    /**
     * Display the specified resource.
     */
    public function show($group_id)
    {
        // //
        // $teams = Team::where('group_id', $group_id)->get();
        // // $teams = Team::get();

        // return response()->json(['message' => 'Successfully retrieving teams', 'teams' => $teams,], 200); //OVDE
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        //
    }
}
