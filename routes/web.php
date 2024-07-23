<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}', [\App\Http\Controllers\IndexController::class, 'index'])
    ->name('any.index')
    ->where('any', '.*');