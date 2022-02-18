<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;


class UsersController
{
    public function index(){

        return User::orderBy('id','DESC')
            ->with(['roles','departments','tasks.sub_tasks'])
            ->get();
    }

    public function usersList(){

        return User::orderBy('id','DESC')->get();
    }


    public function linkDept(Request $request){

        $validator = Validator::make($request->all(), [
            'user_id'          => 'required',
            'department_id'          => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'errors'  => $validator->errors(),
                ],422);
        }


        $user = User::where('id',$request->user_id)->first();

        $user->departments()->sync($request->department_id);


        return  response()->json([
            'message'=>'User Added to Department'
        ],200);
    }

    public function roles(){

        return Role::all();
    }


    public function store(Request $request){

        $user = new User();

        $user->name = $request->name;
        $user->title = $request->title;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        $user->departments()->sync($request->departments);
        $user->roles()->sync($request->roles);


    }


    public function destroy($id){

        return  response()->json([
            'message'=>'Cannot Delete Users at the moment!'
        ],200);


//        $department = Department::where('user_id',$id)->first();
//
//            if($department){
//                return  response()->json([
//                    'message'=>'User is a Department Leader'
//                ],200);
//
//            }else{
//
//
//                if(DB::table('table_users_department')->where('user_id', $id)->delete()){
//
//                    $user = User::where('id',$id)->first();
//                    $user->delete();
//                    return  response()->json([
//                        'message'=>'User Deleted'
//                    ],200);
//                }
//            }

    }

}
