<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{

    public function index()
    {
        return Inertia::render('Comments/Index', [
            'comment' => Comment::with('post')->where('id_user', auth()->id())->paginate(5),
        ]);
    }

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

            public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $validated = $request->validate([
            'konten' => ['required', 'string', 'min:5'],

        ]);
        $comment->update($validated);
                return back();

    
            }
            
        public function destroy(Comment $comment)
        {
            
        $this->authorize('delete', $comment);

        $comment->delete();

        return back();
        }
    

}
