<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Tutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|max:255',
            'mobile'          => 'required',
            'email'          => 'required|email|unique:users',
            'password'       => 'required|confirmed|min:5',
            'accepted_terms' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'errors'  => $validator->errors(),
                ],422);
        }


        $user = new User();

        $user->name    = $request->name;
        $user->mobile  = $request->mobile;
        $user->email   = $request->email;
        $user->password = bcrypt($request->password);
        $user->email    = $request->email;
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
