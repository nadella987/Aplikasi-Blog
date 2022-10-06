<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comment';

    protected $fillable = [
        'konten',
        'id_user',
        'id_post',
    ];

    public function creator(){
        return $this->belongsTo(User::class, 'id_user');
    }

    public function post() {
        return $this->belongsTo(Post::class, 'id_post');
    }
}
