import { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function CommentListItem(props) {
    const[showForm, setShowForm] = useState(false);
    const { data, setData, patch} = useForm({ konten: props.konten});

    function handleUpdate(e) {
        e.preventDefault();
        patch(
            route("comment.update", props.commentId),
            {
                preserveScroll: true,
                onSuccess: () => {
                setShowForm(false);
                Swal.fire({
                    title: "komentar berhasil di update",
                    icon: "success",
                })
            },
        });
    }
    function handleDelete() {
        Swal.fire({
            title: `Anda Yakin Ingin Hapus Komentar?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            denyButtonText: `Tidak`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                 Inertia.visit(route("comment.destroy", props.commentId), 
                 {method: "delete",
                 preserveScroll: true,
                 onSuccess: () => {
                    Swal.fire({
                        title: "komentar berhasil di hapus",
                        icon: "success",
                    })
                 }
                });
            } 
           
          });
    }
 return (
    <div className="flex space-x-3">
<div className="flex-1 space-y-1">
    {/*heading*/}
  <div className="flex items-center justify-between">
    <h3 className="text-sm font-medium">{props.creatorName}</h3>
    <p className="text-sm text-gray-500">{props.timeago}</p>
  </div>

    {/*heading*/}
    {showForm ? (<div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
      </div>
      <div className="min-w-0 flex-1">
        <form onSubmit={handleUpdate}>
          <div className="border-b border-gray-200 focus-within:border-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-indigo-600 focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              value={data.konten}
              onChange={(e) => setData("konten", e.target.value)}
            />
          </div>
          <div className="flex justify-end pt-2">
            <div className="space-x-2">
            <button
            type="button"
            className="inline-flex items-center rounded border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() =>setShowForm(false)}
        >
            Batal komentar
            </button>

            <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Komentar
              </button>
            </div>
           
          </div>
        </form>
      </div>
    </div> ):(
        <p className="text-sm text-gray-500 max-w-xl">
    {props.konten}
  </p>
) }
  
  
  {!showForm && (
  <div className="mt-1 flex space-x-2">
  {props.canEdit && (
  <button
 type="button"
 className="inline-flex items-center rounded border border-transparent bg-blue-100 px-4 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
 onClick={() => setShowForm(true)}
  >
 Edit
</button>
)}
{props.canDelete && (
<button
  type="button"
  className="inline-flex items-center rounded border border-transparent bg-red-100 px-4 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
  onClick={handleDelete}
>
  Hapus
</button>)}
  </div>)}
</div>
</div>
)
}