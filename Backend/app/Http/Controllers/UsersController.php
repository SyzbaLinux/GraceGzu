<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;


class UsersController
{
    public function index(){
        return User::all();
    }

    public function roles(){

        return Role::all();
    }

}
