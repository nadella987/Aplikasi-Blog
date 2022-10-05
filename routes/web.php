<?php

use App\Models\Post;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\WelcomeController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',WelcomeController::class);

Route::middleware(['auth', 'verified'])->group(function (){

    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    //aPost endpoint
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::patch('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    //comment endpoint
    Route::post('/posts/{post}/comment', [CommentController::class, 'store'])->name('comment.store');
});

Route::get('/posts/{post}',[PostController::class, 'show'])->name('posts.show');

require __DIR__.'/auth.php';