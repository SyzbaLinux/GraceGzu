<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PHPUnit\Framework\SyntheticSkippedError;

class Department extends Model
{
    use HasFactory;

    public function users(){

        return $this->belongsToMany(User::class, 'table_users_department','department_id','user_id');
    }

    public function tasks(){
        return $this->belongsToMany(Task::class,'table_department_tasks','department_id','task_id');
    }
}
