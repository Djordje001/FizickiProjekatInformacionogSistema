<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\Match1Controller;
use App\Http\Controllers\StadiumController;
use App\Http\Controllers\TeamController;
use App\Models\Stadium;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/groups/{id}', [GroupController::class, 'show']);
Route::get('/groups', [GroupController::class, 'index']);

Route::post('/stadiums', [StadiumController::class, 'store']);
Route::get('/stadiums', [StadiumController::class, 'index']);

Route::post('/groups', [GroupController::class, 'store']);

Route::get('/teams', [TeamController::class, 'index']);
Route::post('/teams', [TeamController::class, 'store']);
Route::get('/teams/{group_id}', [TeamController::class, 'show']);

Route::get('/matches', [Match1Controller::class, 'index']);
Route::post('/matches', [Match1Controller::class, 'store']);
Route::put('/matches/{id}', [Match1Controller::class, 'update']);




Route::get('images/{imageName}', [StadiumController::class, 'getImage']);
