<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->mediumText('description');
            $table->boolean('is_complete')->default(0);
            $table->enum('status',['Doing','Done','Completed','Created'])->default('Created');
            $table->enum('priority',['Urgent','High','Normal','Low'])->default('Normal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
