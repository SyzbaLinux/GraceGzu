<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubTask extends Model
{
    use HasFactory;

    public function task(){
        return $this->belongsTo(Task::class);
    }

    public function owner(){
        return $this->belongsTo(User::class);
    }


    public function users(){
        return $this->belongsToMany(Task::class,'table_subtasks_users','sub_task_id','user_id');
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
