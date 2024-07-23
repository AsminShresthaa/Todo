<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $todos = $request->user()->todos;
        return response()->json($todos, 200);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $completed = boolval($request->completed);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $todo = $request->user()->todos()->create([
            'title' => $request->title,
            'description' => $request->description,
            'completed'  => $completed,
        ]);

        return response()->json($todo, 201);
    }

    public function show(Request $request, Todo $todo)
    {
        return response()->json($todo, 200);
    }

    public function update(Request $request, Todo $todo)
    {
        $completed = boolval($request->completed);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

            $todo->update([
                'title' => $request->title,
                'description' => $request->description ?? null,
                'completed'  => $completed,
            ]);

        // $todo->update($request->only('title', 'description', 'completed'));

        return response()->json($todo, 200);
    }

    public function destroy(Request $request, Todo $todo)
    {
        $todo->delete();

        return response()->json(['message' => 'Todo deleted'], 204);
    }
}
