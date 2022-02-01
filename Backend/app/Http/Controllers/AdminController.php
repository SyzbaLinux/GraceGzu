<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
     public function index(){

         return response()->json([

             'departments' => Department::all()->count(),
             'projects'    => Project::all()->count(),
             'tasks'       => Task::all()->count(),
             'users'       => User::all()->count(),

         ],200);
     }
}
