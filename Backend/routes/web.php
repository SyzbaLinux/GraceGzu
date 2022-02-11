<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Catch Any lost user
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api).*$')->name('admin');

Route::get('migrate',function(){
    \Artisan::call('migrate:fresh --seed');
    return 'Fresh Migrated & Seed Successfully';
});

Route::get('composer-update',function(){
    $result =  shell_exec('cd ../ && composer update');

    dd($result);
});

