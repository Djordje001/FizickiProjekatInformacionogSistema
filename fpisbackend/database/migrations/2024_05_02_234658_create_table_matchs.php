<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matchs', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            //$table->unsignedBigInteger('group1_id');
            $table->unsignedBigInteger('team1_id');
            //  $table->unsignedBigInteger('group2_id');
            $table->unsignedBigInteger('team2_id');
            $table->unsignedBigInteger('stadium_id');

            $table->unsignedSmallInteger('number_of_goals_team1')->nullable();
            $table->unsignedSmallInteger('number_of_goals_team2')->nullable();

            $table->date('start')->nullable();
            $table->date('end')->nullable();
            //$table->date('end');

            $table->foreign('team1_id')->references('id')->on('teams')->onDelete('cascade');
            $table->foreign('team2_id')->references('id')->on('teams')->onDelete('cascade');

            // $table->foreign(['team2_id', 'group2_id'])
            //     ->references(['id', 'group_id'])
            //     ->on('teams')
            //     ->onDelete('cascade');

            $table->foreign('stadium_id')
                ->references('id')
                ->on('stadiums')
                ->onDelete('cascade');








            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matchs');
    }
};
