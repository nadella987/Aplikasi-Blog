import {Link} from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';


export default function PostDetail(props){
  function handleDelete() {
    Swal.fire({
        title: `Anda Yakin Ingin Hapus ${props.post.judul}`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        denyButtonText: `Tidak`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Inertia.visit(route("posts.destroy", props.post.id), {method: "delete"});
        } 
       
      });
    }
    return (
        <div className="relative overflow-hidden bg-white py-16">
          <div className="flex justify-end space-x-2 py-16 p-8">

          {props.can_update  && (<Link
        href={route("posts.edit", props.post.id)}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Edit Post
      </Link>)}
      {props.can_delete && (
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        onClick={handleDelete}
      >
       Hapus Post
      </button>)}
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-prose text-lg">
              <h1 className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  {props.post.judul}
              </h1> 
            </div>
            <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
              <p> {props.post.konten} </p>
            </div>
          </div>
        </div>
      )
}