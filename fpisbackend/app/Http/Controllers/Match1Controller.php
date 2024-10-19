<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Match1;
use App\Models\Stadium;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class Match1Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $matches = Match1::where('end', null)
            ->join('teams as team1', 'matchs.team1_id', '=', 'team1.id')
            ->join('teams as team2', 'matchs.team2_id', '=', 'team2.id')
            ->join('stadiums as stadiums', 'matchs.stadium_id', '=', 'stadiums.id')
            ->select('matchs.*', 'team1.name as team1_name', 'team2.name as team2_name', 'team1.image_path as team1_image_path', 'team2.image_path as team2_image_path', 'stadiums.image_path as stadium_image_path', 'stadiums.name as stadium_name', 'stadiums.location as stadium_location')
            ->orderBy('matchs.start')
            ->get();


        return response()->json(['message' => 'Successfully retrieving matches', 'matches' => $matches,], 200); //OVDE

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
        $validator = Validator::make($request->all(), [

            'team1_id' => 'required',
            'team2_id' => 'required',
            'start' => 'required|date_format:Y-m-d H:i:s',   //2024-05-03 14:30:00
            'stadium_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        if ($request->team1_id === $request->team2_id) {
            return response()->json(['message' => 'One team cant play vs himself'], 409);
        }

        $team1 = Team::where('id', $request->team1_id)->first();
        $team2 = Team::where('id', $request->team2_id)->first();
        if ($team1->group != $team2->group) {
            return response()->json(['message' => "Match can only be created for teams in same group"], 409);
        }





        $currentDateTime = Carbon::now()->tz('Europe/Belgrade');
        $currentDateTime = $currentDateTime->toDateTimeString();
        if ($request->start < $currentDateTime) {
            return response()->json(['message' => "Time need to be in future"], 409);
        }





        $alreadyPlayed1 = Match1::where('team1_id', $request->team1_id)->where('team2_id', $request->team2_id)->first();
        if ($alreadyPlayed1) {
            return response()->json(['message' => 'We already created match for this two teams'], 409);
        }
        $alreadyPlayed2 = Match1::where('team1_id', $request->team2_id)->where('team2_id', $request->team1_id)->first();
        if ($alreadyPlayed2) {
            return response()->json(['message' => 'We already created match for this two teams'], 409);
        }

        $startDateTime = Carbon::createFromFormat('Y-m-d H:i:s', $request->start);

        $twoHoursAgo = $startDateTime->copy()->subHours(2);
        $twoHoursForward = $startDateTime->copy()->addHours(2);
        $twoHoursAgo = $twoHoursAgo->format('Y-m-d H:i:s');
        $twoHoursForward = $twoHoursForward->format('Y-m-d H:i:s');

        $stadiumInUse = Match1::where('stadium_id', $request->stadium_id)->where('start', '>=', $twoHoursAgo)->where('start', '<=', $twoHoursForward)->first();
        if ($stadiumInUse) {
            return response()->json(['message' => 'This stadium is already in use,put later time'], 409);
        }
        // return $twoHoursAgo;
        //   return $twoHoursForward;
        $alreadyPlaysFirst = Match1::where(function ($query) use ($request) {
            $query->where('team1_id', $request->team1_id)
                ->orWhere('team2_id', $request->team1_id);
        })
            ->where('start', '>=', $twoHoursAgo)
            ->where('start', '<=', $twoHoursForward)
            ->first();

        $alreadyPlaysSecond = Match1::where(function ($query) use ($request) {
            $query->where('team1_id', $request->team2_id)
                ->orWhere('team2_id', $request->team2_id);
        })
            ->where('start', '>=', $twoHoursAgo)
            ->where('start', '<=', $twoHoursForward)
            ->first();
        if ($alreadyPlaysFirst) {
            //return $alreadyPlaysFirst;
            return response()->json(['message' => 'First team is already in match,put later time'], 409);
        }
        if ($alreadyPlaysSecond) {
            //return $alreadyPlaysFirst;
            return response()->json(['message' => 'Second team is already in match,put later time'], 409);
        }



        $match = Match1::create([

            'team1_id' => $request->team1_id,
            'team2_id' => $request->team2_id,
            'start' => $request->start,
            'stadium_id' => $request->stadium_id,
            'number_of_goals_team1' => 0,
            'number_of_goals_team2' => 0

        ]);

        return response()->json(['message' => 'Match successfully created', 'Match' => $match], 201); //OVDE*/
    }

    /**
     * Display the specified resource.
     */
    public function show(Match1 $match1)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Match1 $match1)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [

            'number_of_goals_team1' => 'required',
            'number_of_goals_team2' => 'required',
            'start' => 'required',
            'surrendered' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }
        if ($request->number_of_goals_team1 < 0 || $request->number_of_goals_team2 < 0) {
            return response()->json(['message' => 'Number of goals need to be >= 0'], 422);
        }


        if ($request->surrendered == "true") {

            if (!(($request->number_of_goals_team1 == 3 || $request->number_of_goals_team2 == 3) && ($request->number_of_goals_team2 == 0 || $request->number_of_goals_team1 == 0))) {
                return response()->json(['message' => 'If match is surrendered result need to be 3:0 or 0:3'], 422);
            }

            DB::update("
            UPDATE matchs
            SET number_of_goals_team1=?, number_of_goals_team2=?,end=?
            WHERE id=?
        ", [

                $request->number_of_goals_team1,
                //  $request->image_path,
                //  $request->title,
                $request->number_of_goals_team2,
                $request->start,
                $id

            ]);
        } else {

            $currentDateTime = Carbon::now()->tz('Europe/Belgrade');
            $currentDateTime = $currentDateTime->toDateTimeString();

            if ($currentDateTime < $request->start) {

                return response()->json(['message' => 'Match was not started yet'], 409);
            }
            DB::update("
            UPDATE matchs
            SET number_of_goals_team1=?, number_of_goals_team2=?,end=?
            WHERE id=?
        ", [

                $request->number_of_goals_team1,
                //  $request->image_path,
                //  $request->title,
                $request->number_of_goals_team2,
                $currentDateTime,
                $id

            ]);
        }
        return response()->json(['message' => 'Match sucesfully updated'], 200); //OVDE
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Match1 $match1)
    {
        //
    }
}
