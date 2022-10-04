<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function __invoke()
    {
        $posts = Post::paginate(10)->through(function ($post) {
            return [
                'id'=> $post->id,
                'tanggal' => $post->created_at->toFormattedDateString(),
                'judul' => $post->judul,
                'konten' => $post->konten,
    
            ];
        });
        return Inertia::render('Welcome', compact('posts'));
    }
}
