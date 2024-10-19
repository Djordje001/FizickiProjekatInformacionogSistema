<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Match1 extends Model
{
    use HasFactory;

    protected $table = 'matchs';


    protected $fillable = [
        'team1_id',
        'team2_id',
        'stadium_id',
        'number_of_goals_team1',
        'number_of_goals_team2',
        'end',
        'start',
    ];

    public function stadium()
    {
        return $this->belongsTo(Stadium::class, 'stadium_id', 'id');
    }

    public function host()
    {
        return $this->belongsTo(Team::class, 'team1_id', 'id');
    }

    public function quest()
    {
        return $this->belongsTo(Team::class, 'team2_id', 'id');
    }
}
