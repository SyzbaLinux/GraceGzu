<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         return Task::all();
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//            user_id:[],
//            project_id:this.project.id,
//            title:null,
//            start_date:null,
//            end_date:null,
//            description:null,
//            is_complete:0,
//            status:null,
//            priority:'High',

        $validator = Validator::make($request->all(), [
            'user_id'        => 'required',
            'project_id'     => 'required',
            'title'          => 'required',
            'start_date'     => 'required',
            'status'         => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'errors'  => $validator->errors(),
                ],422);
        }

        $task = new Task();

        $task->project_id   = $request->project_id;
        $task->title        =  $request->title;
        $task->user_id      =  1;
        $task->start_date   = date('Y-m-d',strtotime( $request->start_date));
        $task->end_date     = date('Y-m-d',strtotime( $request->end_date));;
        $task->description  =  $request->description;
        $task->is_complete  =  $request->is_complete;
        $task->status       =  $request->status;
        $task->priority     =  $request->priority;

        $task->save();

        return response()->json([
            'message'=>'Task Added Successfully'
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        //
    }
}
