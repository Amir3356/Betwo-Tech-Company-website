<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $projects->map(fn (Project $project) => $this->formatProject($project, request())),
        ]);
    }

    public function store(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'uptime' => 'nullable|string|max:50',
            'duration' => 'required|string|max:100',
            'description' => 'required|string',
            'image' => 'nullable',
        ])->validate();

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('projects', 'public');
        }

        $project = Project::create(array_merge($validated, ['image' => $imagePath ? '/storage/' . $imagePath : null]));

        return response()->json(['data' => $this->formatProject($project, $request)], 201);
    }

    public function show(Request $request, Project $project)
    {
        return response()->json(['data' => $this->formatProject($project, $request)]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:255',
            'uptime' => 'nullable|string|max:50',
            'duration' => 'sometimes|string|max:100',
            'description' => 'sometimes|string',
            'image' => 'nullable',
        ])->validate();

        if ($request->hasFile('image')) {
            if ($project->image) {
                $oldPath = str_replace('/storage/', '', $project->image);
                Storage::disk('public')->delete($oldPath);
            }
            $imagePath = $request->file('image')->store('projects', 'public');
            $validated['image'] = '/storage/' . $imagePath;
        }

        $project->update($validated);

        return response()->json(['data' => $this->formatProject($project->fresh(), $request)]);
    }

    public function destroy(Project $project)
    {
        if ($project->image) {
            $path = str_replace('/storage/', '', $project->image);
            Storage::disk('public')->delete($path);
        }
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully']);
    }

    private function formatProject(Project $project, Request $request): array
    {
        $projectData = $project->toArray();

        if (!empty($projectData['image']) && str_starts_with($projectData['image'], '/storage/')) {
            $projectData['image'] = $request->getSchemeAndHttpHost() . $projectData['image'];
        }

        return $projectData;
    }
}