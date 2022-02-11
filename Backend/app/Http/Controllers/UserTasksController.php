<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;

class UserTasksController extends Controller
{
     public function departments(){
         return User::where('id', auth()->user()->id)->with('departments')->first();
     }
}
