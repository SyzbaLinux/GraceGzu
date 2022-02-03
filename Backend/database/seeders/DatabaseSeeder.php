<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         //\App\Models\User::factory(10)->create();

        \DB::table('roles')->delete();
        \DB::table('roles')->insert(
            array(
                0 => array('name' => 'admin', 'guard_name' => 'web'),
                1 => array('name' => 'user', 'guard_name' => 'web'),
                2 => array('name' => 'department leader', 'guard_name' => 'web'),
            )
        );

        \DB::table('users')->delete();
        \DB::table('users')->insert(
            array(
                0 => array('name' => 'Admin Root', 'role'   => 'admin',   'email'=> 'admin@example.com', 'password'=> Hash::make('12345678')),
                1 => array('name' => 'User Basic', 'role'   => 'user', 'email'=> 'tutor@example.com', 'password'=> Hash::make('12345678')),
            )
        );
    }
}
