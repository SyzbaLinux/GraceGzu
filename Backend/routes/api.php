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





//TASK MANAGER APP API
Route::group(['prefix' => 'tasks-manager'], function ($router) {


    Route::get('stages', [\App\Http\Controllers\StagesController::class, 'index']);
    Route::get('users-list', [\App\Http\Controllers\UsersController::class, 'usersList']);

    //Auth Management
    Route::group(['prefix' => 'auth'], function ($router) {
        Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
        Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
        Route::post('user',  [\App\Http\Controllers\AuthController::class, 'user'])->middleware(['auth:api']);
        Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout'])->middleware(['auth:api']);
    });




    Route::group(['prefix' => 'admin',
        'middleware' => 'auth:api'
    ], function ($router) {

        Route::post('users-sync', [\App\Http\Controllers\UsersController::class,'linkDept']);
        Route::resource('department', \App\Http\Controllers\DepartmentController::class);
        Route::resource('users', \App\Http\Controllers\UsersController::class);
        Route::get('roles', [\App\Http\Controllers\UsersController::class, 'roles']);
        Route::resource('tasks', \App\Http\Controllers\TaskController::class);
        Route::resource('projects', \App\Http\Controllers\ProjectController::class);
        Route::resource('stages', \App\Http\Controllers\StagesController::class);
        Route::get('stats', [\App\Http\Controllers\AdminController::class, 'index']);

    });



    Route::group(['prefix' => 'user',
        'middleware' => 'auth:api'
    ], function ($router) {

        Route::get('department', [\App\Http\Controllers\UserTasksController::class,'departments']);


    });
});
