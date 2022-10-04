import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import classNames from 'classnames';
import Swal from 'sweetalert2';




export default function PostLink(props) {
    const [prevLink] = props.posts.links.slice(0, 1);
    const numberedLinks = props.posts.links.slice(1, -1);
    const [ nextLink ] = props.posts.links.slice(-1);

    function handleDelete(post) {
        Swal.fire({
            title: `Anda Yakin Ingin Hapus ${post.judul}`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            denyButtonText: `Tidak`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Inertia.visit(route("posts.destroy", post.id), {method: "delete"});
            } 
           
          });
    }

return (
    <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={
        <div className="flex items-end justify-between">
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">My Post</h2>
        <Link
        href={route("posts.create")}
        as="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        tambah post
      </Link>
        </div>
        }
    >
        <Head title="My Posts" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Judul Post
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Tanggal
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {props.posts.data.map((post, Idx) => (
                    <tr key={post.id} className={Idx % 2 === 0 ? undefined : 'bg-gray-50'}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {post.judul}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.tanggal}</td>
                
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium space-x-2 sm:pr-6">
                        <Link href={route('posts.edit', post.id)} className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {post.judul}</span>
                        </Link>
                        <button
                        type="button"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(post)}>
                          Hapus
                          <span className="sr-only">, {post.judul}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{props.posts.from}</span> to <span className="font-medium">{props.posts.to}</span> of{' '}
            <span className="font-medium">{props.posts.total}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Link
              href={prevLink.url}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              as={prevLink ? "a" : "span"}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {numberedLinks.map(link => (
                <Link
                key={link.label}
                href={link.url}
                aria-current="page"
                className={classNames(
                    link.active
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                    "relative  inline-flex items-center  border px-4 py-2 text-sm font-medium focus:z-20"
                )}
              >
                {link.label}
              </Link> 
            ))}
            
            <Link
              href={nextLink.url}
              as={nextLink.url ? "a" : "span"}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
            </div>
          </div>
        </div>
        </div>
            </div>
        </div>
    </AuthenticatedLayout>
);

}
