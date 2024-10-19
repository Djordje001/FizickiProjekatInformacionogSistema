<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Match1;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class GroupController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    // $matches = Match1::select(
    //     'teams.id AS team_id',
    //     'teams.name',
    //     DB::raw('SUM(CASE WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 > matchs.number_of_goals_team2 THEN 1
    //                   WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 > matchs.number_of_goals_team1 THEN 1
    //                   ELSE 0 END) AS wins'),
    //     DB::raw('SUM(CASE WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 < matchs.number_of_goals_team2 THEN 1
    //                   WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 < matchs.number_of_goals_team1 THEN 1
    //                   ELSE 0 END) AS losses'),

    //     DB::raw('SUM(CASE WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 = matchs.number_of_goals_team2 THEN 1
    //                   WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 = matchs.number_of_goals_team1 THEN 1
    //                   ELSE 0 END) AS tieds'),
    //     DB::raw('SUM(CASE WHEN matchs.team1_id = teams.id THEN matchs.number_of_goals_team1 ELSE matchs.number_of_goals_team2 END) AS goals_scored'),
    //     DB::raw('SUM(CASE WHEN matchs.team1_id = teams.id THEN matchs.number_of_goals_team2 ELSE matchs.number_of_goals_team1 END) AS goals_conceded'),
    //     DB::raw('SUM(CASE WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 > matchs.number_of_goals_team2 THEN 3
    //                   WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 > matchs.number_of_goals_team1 THEN 3
    //                   WHEN matchs.number_of_goals_team1 = matchs.number_of_goals_team2 THEN 1
    //                   ELSE 0 END) AS points')
    // )
    //     ->join('teams', function ($join) {
    //         $join->on('matchs.team1_id', '=', 'teams.id')
    //             ->orOn('matchs.team2_id', '=', 'teams.id');
    //     })
    //     ->join('groups', 'teams.group_id', '=', 'groups.id')
    //     ->where('groups.id', '=', '1')
    //     ->groupBy('teams.id', 'teams.name')
    //     ->get();

    // return $matches;

    $groups = Group::get();
    return response()->json(['message' => 'Successfully retrieving groups', 'groups' => $groups,], 200); //OVDE
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

    ]);
    if ($validator->fails())
      return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);


    $group = Group::create([

      'name' => $request->name,

    ]);

    return response()->json(['message' => 'Group successfully created', 'Group' => $group], 201); //OVDE
  }


  /**
   * Display the specified resource.
   */
  public function show($id)
  {
    //
    $data = Match1::select(
      'teams.id AS team_id',
      'teams.name',
      DB::raw('SUM(CASE 
            WHEN matchs.team1_id = teams.id AND matchs.end IS NOT NULL THEN 1
            WHEN matchs.team2_id = teams.id AND matchs.end IS NOT NULL THEN 1
            ELSE 0 
          END) AS played_games'),
      DB::raw('SUM(CASE 
            WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 > matchs.number_of_goals_team2 THEN 1
            WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 > matchs.number_of_goals_team1 THEN 1
            ELSE 0 
          END) AS wins'),
      DB::raw('SUM(CASE 
            WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 < matchs.number_of_goals_team2 THEN 1
            WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 < matchs.number_of_goals_team1 THEN 1
            ELSE 0 
          END) AS losses'),

      DB::raw('SUM(CASE 
            WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 = matchs.number_of_goals_team2 AND matchs.end IS NOT NULL THEN 1
            WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 = matchs.number_of_goals_team1 AND matchs.end IS NOT NULL THEN 1
            ELSE 0 
          END) AS tieds'),
      DB::raw('SUM(CASE 
            WHEN matchs.team1_id = teams.id THEN matchs.number_of_goals_team1 
            ELSE matchs.number_of_goals_team2 
          END) AS goals_scored'),
      DB::raw('SUM(CASE 
            WHEN matchs.team1_id = teams.id THEN matchs.number_of_goals_team2 
            ELSE matchs.number_of_goals_team1 
          END) AS goals_conceded'),
      DB::raw('SUM(CASE 
            WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 > matchs.number_of_goals_team2 THEN 3
            WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 > matchs.number_of_goals_team1 THEN 3
            WHEN matchs.number_of_goals_team1 = matchs.number_of_goals_team2 AND matchs.end IS NOT NULL THEN 1
            ELSE 0 
          END) AS points')
    )
      ->join('teams', function ($join) {
        $join->on('matchs.team1_id', '=', 'teams.id')
          ->orOn('matchs.team2_id', '=', 'teams.id');
      })
      ->join('groups', 'teams.group_id', '=', 'groups.id')
      ->where('groups.id', '=', $id)
      ->groupBy('teams.id', 'teams.name')
      ->orderByDesc('points')
      ->get();




    $data = Team::select(
      'teams.id AS team_id',
      'teams.name',
      DB::raw('COALESCE(SUM(CASE 
                WHEN matchs.team1_id = teams.id AND matchs.end IS NOT NULL THEN 1
                WHEN matchs.team2_id = teams.id AND matchs.end IS NOT NULL THEN 1
                ELSE 0 
            END), 0) AS played_games'),
      DB::raw('COALESCE(SUM(CASE 
                WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 > matchs.number_of_goals_team2 THEN 1
                WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 > matchs.number_of_goals_team1 THEN 1
                ELSE 0 
            END), 0) AS wins'),
      DB::raw('COALESCE(SUM(CASE 
                WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 < matchs.number_of_goals_team2 THEN 1
                WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 < matchs.number_of_goals_team1 THEN 1
                ELSE 0 
            END), 0) AS losses'),

      DB::raw('COALESCE(SUM(CASE 
                WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 = matchs.number_of_goals_team2 AND matchs.end IS NOT NULL THEN 1
                WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 = matchs.number_of_goals_team1 AND matchs.end IS NOT NULL THEN 1
                ELSE 0 
            END), 0) AS tieds'),
      DB::raw('COALESCE(SUM(CASE 
                WHEN matchs.team1_id = teams.id THEN matchs.number_of_goals_team1 
                ELSE matchs.number_of_goals_team2 
            END), 0) AS goals_scored'),
      DB::raw('COALESCE(SUM(CASE 
                WHEN matchs.team1_id = teams.id THEN matchs.number_of_goals_team2 
                ELSE matchs.number_of_goals_team1 
            END), 0) AS goals_conceded'),
      DB::raw('COALESCE(SUM(CASE 
                WHEN matchs.team1_id = teams.id AND matchs.number_of_goals_team1 > matchs.number_of_goals_team2 THEN 3
                WHEN matchs.team2_id = teams.id AND matchs.number_of_goals_team2 > matchs.number_of_goals_team1 THEN 3
                WHEN matchs.number_of_goals_team1 = matchs.number_of_goals_team2 AND matchs.end IS NOT NULL THEN 1
                ELSE 0 
            END), 0) AS points')
    )
      ->leftJoin('matchs', function ($join) {
        $join->on('teams.id', '=', 'matchs.team1_id')
          ->orOn('teams.id', '=', 'matchs.team2_id');
      })
      ->join('groups', 'teams.group_id', '=', 'groups.id')
      ->where('groups.id', '=', $id)
      ->groupBy('teams.id', 'teams.name')
      ->orderByDesc('points')
      ->get();



    return response()->json(['message' => 'Successfully retrieving data for tables', 'data' => $data,], 200); //OVDE
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Group $group)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Group $group)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Group $group)
  {
    //
  }
}
