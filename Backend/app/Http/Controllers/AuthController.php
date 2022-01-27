<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|max:255',
            'title'          => 'required|max:255',
            'email'          => 'required|email|unique:users',
            'password'       => 'required|confirmed|min:5',
            'accepted_terms' => 'required',
        ],
            [
                'name.required'=>'Fullname is required',
                'title.required'=>'Please enter your work Title',
                'accepted_terms.required'=>'Please read and accept the terms and conditions',
            ]
        );
        if ($validator->fails()) {
            return response()->json(
                [
                    'errors'  => $validator->errors(),
                ],422);
        }
        if($request->accepted_terms == 0){
            return response()->json(
                [
                    'errors'  => [
                        'terms_errors' =>  ['Please Accept out terms and conditions']
                    ],
                ],422);
        }

        $user = new User();

        $user->name    = $request->name;
        $user->email    = $request->email;
        $user->title    = $request->title;
        $user->password = bcrypt($request->password);
        $user->save();

        $token = $user->createToken('API Token')->accessToken;
        return response([ 'user' => $user, 'token' => $token]);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($data)) {
            return response([
                'errors' => 'The email address or password you entered is incorrect'
            ],401);
        }else{

            $token = auth()->user()->createToken('API Token')->accessToken;
            return response(['user' => auth()->user(), 'token' => $token]);
        }

    }


    public function user()
    {

        if(Auth::check()){
            return response()->json([
                'user'      => Auth::user(),
            ],200);

        }else{

            return response()->json(['message'=>'Unauthorized'],401);
        }
    }

    public function logout()
    {
        Auth::user()->logout;
        return response()->json(['message' => 'Successfully logged out'],200);
    }
}
