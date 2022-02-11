<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public function departments(){
        return $this->belongsToMany(Department::class,'table_department_tasks','task_id','department_id');
    }

    public function owner(){
        return $this->belongsTo(User::class);
    }


    public function users(){
        return $this->belongsToMany(User::class,'table_tasks_users','task_id','user_id');
    }

    public function sub_tasks(){
        return $this->hasMany(SubTask::class);
    }


    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
