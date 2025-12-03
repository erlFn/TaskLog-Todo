<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class RegisterController extends Controller
{
    public function store(Request $request)
    {
        try{
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:8|confirmed'

        ]);


        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
    ]);

        return redirect('/login')->with('Success','Accounted Created!');
    } catch (\Illuminate\Validation\ValidationException $e) {

        return redirect()->back()->withErrors($e->errors())->withInput();
    } catch (\Exception $e) {

        return redirect()->back()->with('error', 'Something went wrong: ' . $e->getMessage());


        }
    }
}