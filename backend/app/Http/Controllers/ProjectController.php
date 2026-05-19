<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $projects]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'uptime' => 'nullable|string|max:50',
            'duration' => 'required|string|max:100',
            'description' => 'required|string',
            'image' => 'nullable|string|max:500',
        ]);

        $project = Project::create($validated);
        return response()->json(['data' => $project], 201);
    }

    public function show(Project $project)
    {
        return response()->json(['data' => $project]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:255',
            'uptime' => 'nullable|string|max:50',
            'duration' => 'sometimes|string|max:100',
            'description' => 'sometimes|string',
            'image' => 'nullable|string|max:500',
        ]);

        $project->update($validated);
        return response()->json(['data' => $project]);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully']);
    }
}