<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableSubtasksUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_subtasks_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sub_task_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('sub_task_id')->references('id')->on('tasks');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table_subtasks_users');
    }
}
