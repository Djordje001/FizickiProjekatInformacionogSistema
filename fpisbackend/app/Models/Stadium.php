<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
    use HasFactory;

    protected $table = 'stadiums';

    protected $fillable = [
        'name',
        'image_path',
        'location'

    ];

    public function matches()
    {
        return $this->hasMany(Match1::class, 'stadium_id', 'id');
    }
}
