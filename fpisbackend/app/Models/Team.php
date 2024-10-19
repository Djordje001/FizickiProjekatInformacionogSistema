<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'name',
        'image_path',


    ];



    public function group()
    {
        return $this->belongsTo(Group::class, 'group_id', 'id');
    }


    public function matchesAsTeam1()
    {
        return $this->hasMany(Match1::class, 'team1_id');
    }

    public function matchesAsTeam2()
    {
        return $this->hasMany(Match1::class, 'team2_id');
    }
    public function matches()
    {
        return $this->matchesAsTeam1->merge($this->matchesAsTeam2);
    }
}
