<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => ContactMessage::latest()->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email:rfc,dns', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $contactMessage = ContactMessage::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'] ?? null,
            'message' => $validated['message'],
        ]);

        Mail::send('emails.contact', [
            'name' => $contactMessage->name,
            'email' => $contactMessage->email,
            'subject' => $contactMessage->subject,
            'message' => $contactMessage->message,
        ], function ($message) use ($contactMessage) {
            $message->to(config('mail.from.address'))
                ->subject('New Contact Message: ' . ($contactMessage->subject ?: 'No Subject'))
                ->from($contactMessage->email, $contactMessage->name);
        });

        return response()->json([
            'message' => 'Your message has been received.',
            'data' => $contactMessage,
        ], 201);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $contactMessage = ContactMessage::findOrFail($id);
        $contactMessage->delete();

        return response()->json([
            'message' => 'Message deleted successfully.',
        ]);
    }
}