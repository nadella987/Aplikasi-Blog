<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'konten' => ['required', 'string', 'min:5'],

        ]);
        comment::create(array_merge($validated, [
                'id_user' => auth()->id(),
                'id_post' => $post->id,
                ]));

                return back();

    }
}
