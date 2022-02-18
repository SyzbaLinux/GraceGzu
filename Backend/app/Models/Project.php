<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $withCount = [
        'tasks',
        'departments'
    ];

    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function departments(){
        return $this->belongsToMany(Department::class,'project_department','project_id','department_id');
    }


}
