<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Smart Garage Management System',
                'category' => 'Automotive',
                'uptime' => '99.9%',
                'duration' => '6 weeks',
                'description' => 'Digital system serving 50+ auto repair shops with 99.9% uptime',
                'image' => '/assets/Smart Garage Management System.png',
            ],
            [
                'title' => 'Construction Project Management System',
                'category' => 'Construction',
                'uptime' => '99.9%',
                'duration' => '10 weeks',
                'description' => 'Managing 100+ construction sites with real-time tracking',
                'image' => '/assets/Construction Project Management System.png',
            ],
            [
                'title' => 'Betwo Inventory',
                'category' => 'Inventory',
                'uptime' => '99.9%',
                'duration' => '8 weeks',
                'description' => 'Tracking 500,000+ SKUs across 10+ warehouses',
                'image' => '/assets/Betwo Inventory.png',
            ],
            [
                'title' => 'GPO Management System',
                'category' => 'Procurement',
                'uptime' => '99.9%',
                'duration' => '12 weeks',
                'description' => 'Managing $50M+ in procurement volume annually',
                'image' => '/assets/GPO Management System.jpeg',
            ],
            [
                'title' => 'Pharmacy Management System',
                'category' => 'Healthcare',
                'uptime' => '99.9%',
                'duration' => '7 weeks',
                'description' => 'Serving 200+ pharmacies with 99.9% accuracy',
                'image' => '/assets/Pharmacy Management System.png',
            ],
            [
                'title' => 'Workshop Management System',
                'category' => 'Industrial',
                'uptime' => '99.9%',
                'duration' => '9 weeks',
                'description' => 'Managing 1,000+ industrial assets across 5 facilities',
                'image' => '/assets/Workshop Management System.png',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}