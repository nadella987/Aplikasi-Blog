<?php

namespace App\Http\Controllers;


use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\inertia;

class PostController extends Controller
{
    public function index() {
        return Inertia::render('Posts/Index', [
            'posts' => Post::where('id_user', auth()->id())-> 
            paginate(5)->through(function ($post) {
                return [
                    'id'=> $post->id,
                    'tanggal' => $post->created_at->toDayDateTimeString(),
                    'judul' => $post->judul,
                    
                ];
            }),
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'judul' => ['required', 'string', 'min:5', 'max:150'],
            'konten' => ['required', 'string', 'min:10'],
    
        ]);
        Post::create(array_merge($validated, ['id_user' => auth()->id()]));
    
        return redirect(route('posts.index'));
    }

    public function create() {
        return Inertia::render('Posts/Create');

    }

    public function edit(Post $post)
    {
        $this->authorize('update', $post);
    
        return Inertia::render('Posts/Edit', compact('post'));
    }

    public function update(Request $request, $postId, Post $post)
    {
        $this->authorize('update', $post);

        $post = Post::find($postId);
        $validated = $request->validate([
            'judul' => ['required', 'string', 'min:5', 'max:150'],
            'konten' => ['required', 'string', 'min:10'],
    
        ]);
        $post->update($validated);
    
        return redirect(route('posts.index'));
    }

    public function show(Post $post)
    {


        return Inertia::render('PostDetail', [
        'post' => $post,
        'can_update' => request()->user()->can('update', $post),
        'can_delete' => request()->user()->can('delete', $post),
    
    ]);
    
    }

    public function destroy( Request $request, Post $post)
    {
        $prevUrl = $request->headers->get('referer');
        $intendedUrl = preg_match('/\/posts\/\d/', $prevUrl) ? '/' : route('posts.index');

        $this->authorize('delete', $post);
        
        $post->delete();
        return redirect($intendedUrl);
    }

    }

