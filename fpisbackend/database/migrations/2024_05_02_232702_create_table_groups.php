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
        Schema::create('groups', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->string('name')->nullable();

            // $table->unsignedBigInteger('team1_id');
            // $table->unsignedBigInteger('team2_id');
            // $table->unsignedBigInteger('team3_id');
            // $table->unsignedBigInteger('team4_id');



            // $table->foreign('team1_id')
            //     ->references('id')
            //     ->on('teams')
            //     ->onDelete('restrict');


            // $table->foreign('team2_id')
            //     ->references('id')
            //     ->on('teams')
            //     ->onDelete('restrict');


            // $table->foreign('team3_id')
            //     ->references('id')
            //     ->on('teams')
            //     ->onDelete('restrict');


            // $table->foreign('team4_id')
            //     ->references('id')
            //     ->on('teams')
            //     ->onDelete('restrict');




            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
