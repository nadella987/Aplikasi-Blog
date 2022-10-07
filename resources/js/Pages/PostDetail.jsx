import { Fragment, useState, useEffect} from 'react'
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import CommentListItem from '@/Components/CommentListItem';
import { Listbox, Transition } from '@headlessui/react'
import {Link, useForm} from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import classNames from 'classnames';

const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]



export default function PostDetail(props){
  const [selected, setSelected] = useState(moods[5])
  const form = useForm({
    'konten': "",
  });

  useEffect(() => {

    //parse url untuk mendapatkan id komentar
    const commentIdFromUrl = window.location.hash.substring(1);

    //cari element yang memiliki id komentar dari url
    const scrollToElement = document.getElementById(commentIdFromUrl);

   
     if (scrollToElement){
      //scroll ke element tersebut
      scrollToElement?.scrollIntoView({ behavior: "smooth" });

      // highlight komentar yang di tambahakan
      setTimeout(() => scrollToElement.classList.add("bg-yellow-50"), 500);

      //hapus highlight setelah 2 dtk
      setTimeout(() => scrollToElement.classList.remove("bg-yellow-50"), 2000);
        
     }
    
  }, []);

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
    function submitComment(e) {
      e.preventDefault();
      form.post(route("comment.store", props.post.id), {
        onSuccess: () => form.reset("konten"),
        preserveScroll: true,
      });
    }

    return (
        <div className="bg-white py-16 px-8">
          <div className="flex justify-end space-x-2">

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
            <div className="mx-auto max-w-xl text-lg">
              <h1 className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  {props.post.judul}
              </h1> 
            </div>
            <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
              <p> {props.post.konten} </p>
            </div>
            

      {/* comment list */}
      <div className="flex mt-12 mx-auto mt-12 max-w-lg">
      <ul role="list" className="divide-y divide-gray-200 w-full">
        {props.comment.map((comment ) => (
          <li key={comment.id} 
          className="py-4" 
          id={`comment-${comment.id}`}>

            <CommentListItem  
            creatorName={comment.creatorName} 
            timeago={comment.timeago} 
            konten={comment.konten} 
            canEdit={comment.can_edit} 
            canDelete={comment.can_delete} />
             
          </li>
        ))}
      </ul>
    </div>

     {/* comment colom*/}     
    {props.auth.user && ( <div className="flex items-start space-x-4 mt-12 mx-auto mt-12 max-w-lg">
        <div className="min-w-0 flex-1">
          <form onSubmit={submitComment} className="relative">
           <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              value={form.data.konten}
              onChange={e => form.setData("konten", e.target.value)}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="sr-only"> Your mood </Listbox.Label>
                      <div className="relative">
                        <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                          <span className="flex items-center justify-center">
                            {selected.value === null ? (
                              <span>
                                <FaceSmileIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                <span className="sr-only"> Add your mood </span>
                              </span>
                            ) : (
                              <span>
                                <span
                                  className={classNames(
                                    selected.bgColor,
                                    'flex h-8 w-8 items-center justify-center rounded-full'
                                  )}
                                >
                                  <selected.icon className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                                </span>
                                <span className="sr-only">{selected.name}</span>
                              </span>
                            )}
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                            {moods.map((mood) => (
                              <Listbox.Option
                                key={mood.value}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'bg-gray-100' : 'bg-white',
                                    'relative cursor-default select-none py-2 px-3'
                                  )
                                }
                                value={mood}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={classNames(
                                      mood.bgColor,
                                      'w-8 h-8 rounded-full flex items-center justify-center'
                                    )}
                                  >
                                    <mood.icon
                                      className={classNames(mood.iconColor, 'flex-shrink-0 h-5 w-5')}
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <span className="ml-3 block truncate font-medium">{mood.name}</span>
                                </div>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={form.processing}
              >
                Post Comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    )}

    {!props.auth.user && (
    <div className="mt-12 space-y-3">
      <p className="font-medium text-lg text-gray-400 text-center ">silahkan login untuk menambahkan komentar</p>
      <div className="flex justify-center">
      <Link
        href={route ("login")}
        className="inline-flex items-center rounded border border-gray-300 bg-white px-6 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Login
      </Link>
      </div>
      </div>
      )}
    </div>
</div>
  )
}