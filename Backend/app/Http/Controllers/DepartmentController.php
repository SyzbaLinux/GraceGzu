<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         return Department::where('is_active',1)
             ->with(['tasks','users','owner'])
             ->orderBy('title','ASC')
             ->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|unique:departments',
            'user_id' => 'required',
        ]);

        $department = new Department();
        $department->title     = $request->title;
        $department->user_id   = $request->user_id;
        $department->is_active = $request->is_active? : 0;
        $department->save();

        return response()->json([ 'message'=> 'Department Saved'],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function show(Department $department)
    {
        return  Department::where('id',$department->id)
            ->with(['users','projects','owner','tasks'])
            ->firstOrFail();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function edit(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Department $department)
    {
        $data = $request->validate([
            'title' => 'required|unique:departments',
            'user_id' => 'required',
        ]);

        $department =   Department::where('id',$request->id)->firstOrFail();
        $department->title     = $request->title;
        $department->user_id   = $request->user_id;
        $department->is_active = $request->is_active? : 0;
        $department->save();

        return response()->json([ 'message'=> 'Department Updated'],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function destroy(Department $department)
    {
        if($department->delete()){
            return response()->json([ 'message'=> 'Department Deleted'],200);
        }
    }
}
