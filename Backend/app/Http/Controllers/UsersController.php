<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;


class UsersController
{
    public function index(){
        return User::all();
    }

    public function roles(){

        return Role::all();
    }


    public function store(Request $request){

//        :'',
//        :'',
//        :'',
//        :'',
//        :'',
//        roles:[]
//        departments:[]

        $user = new User();

        $user->name = $request->name;
        $user->title = $request->title;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();


    }

}
