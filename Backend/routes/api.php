<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//Auth Management
Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::post('user',  [\App\Http\Controllers\AuthController::class, 'user'])->middleware(['auth:api']);
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout'])->middleware(['auth:api']);
});

Route::group([
    'prefix' => 'admin',
    'middleware' => 'auth:api'
], function ($router) {

    Route::resource('department', \App\Http\Controllers\DepartmentController::class);
    Route::resource('users', \App\Http\Controllers\UsersController::class);

});
