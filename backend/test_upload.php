<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Http\Kernel');

use Illuminate\Http\Request;
use App\Http\Controllers\ProjectController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Facade;

// Create a test image file
$testImagePath = __DIR__.'/storage/app/public/projects/test.png';
file_put_contents($testImagePath, base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAGgJJlKUABQKAAAABJRU5ErkJggg=='));

echo "Created test image at: $testImagePath".PHP_EOL;

Facade::setFacadeApplication($app);
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Create request with file
$request = Request::create('/api/projects', 'POST', [
    'title' => 'Test Project Fix',
    'category' => 'Testing',
    'uptime' => '99.9%',
    'duration' => '1 week',
    'description' => 'Test description for upload fix',
]);

// Add the file to request
$file = new UploadedFile(
    $testImagePath,
    'test.png',
    'image/png',
    filesize($testImagePath),
    0,
    true
);
$request->files->set('image', $file);

echo 'Testing project creation with image upload...'.PHP_EOL;

// Test the controller
$controller = new ProjectController();
try {
    $response = $controller->store($request);
    $data = json_decode($response->getContent(), true);
    echo 'SUCCESS: Project created'.PHP_EOL;
    echo 'Project ID: '.$data['data']['id'].PHP_EOL;
    echo 'Image path: '.$data['data']['image'].PHP_EOL;
    
    // Check if file was actually stored
    if ($data['data']['image']) {
        $imagePath = str_replace('/storage/', '', $data['data']['image']);
        $fullPath = storage_path('app/public/').$imagePath;
        echo 'File exists: '.(file_exists($fullPath) ? 'Yes' : 'No').PHP_EOL;
        if (file_exists($fullPath)) {
            echo 'File size: '.filesize($fullPath).' bytes'.PHP_EOL;
        }
    }
} catch (Exception $e) {
    echo 'ERROR: '.$e->getMessage().PHP_EOL;
    // Show trace for debugging
    foreach ($e->getTrace() as $trace) {
        if (isset($trace['file']) && strpos($trace['file'], '/Betwo-Tech-Company-website-main/') !== false) {
            echo ' in '.$trace['file'].':'.$trace['line'].PHP_EOL;
            break;
        }
    }
} finally {
    // Clean up test file
    if (file_exists($testImagePath)) {
        unlink($testImagePath);
        echo 'Cleaned up test file'.PHP_EOL;
    }
}