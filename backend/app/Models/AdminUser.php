<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class AdminUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'password',
        'api_token',
    ];

    protected $hidden = [
        'password',
        'api_token',
    ];

    public function setPasswordAttribute(string $value): void
    {
        $this->attributes['password'] = Hash::make($value);
    }
}