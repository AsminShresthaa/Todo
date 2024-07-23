<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(){
        return view('welcome'); // Assuming welcome.blade.php is located in resources/views/welcome.blade.php
    }
}
