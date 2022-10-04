import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import {Link} from "@inertiajs/inertia-react"; 


export default function welcome(props) {
  const [prevLinks] = props.posts.links.slice(0, 1);
    const numberedLinks = props.posts.links.slice(1, -1);
    const [ nextLink ] = props.posts.links.slice(-1);


    return (
      <>
      <nav className="bg-gray-800">
    
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
               
              <Link
              as="button"
              href={props.auth.user ? route("dashboard") : route("login")}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
       {props.auth.user ? "Dashboard" : "login"}
      </Link>
                {/* Profile dropdown */}
    
              </div>
            </div>
          </div>
    
    </nav>
      <div className="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Press</h2>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-5">
              <p className="text-xl text-gray-500">Get weekly articles in your inbox on how to grow your business.</p>
              <form className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email-address"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 lg:max-w-xs"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-2 flex w-full flex-shrink-0 rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:inline-flex sm:w-auto">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto"
                  >
                    Notify me
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {props.posts.data.map((post) => (
              <div key={post.id}>
                <p className="text-sm text-gray-500">
                  <time dateTime={post.tanggal}>{post.tanggal}</time>
                </p>
                <a href="#" className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900">{post.judul}</p>
                  <p className="mt-3 text-base text-gray-500">{post.konten}</p>
                </a>
                <div className="mt-3">
                  <Link href={route('posts.show', post.id)} 
                  className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                    Read full story
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <nav className="flex items-center justify-between mt-12 border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">

        <Link
          href={prevLinks.url}
         className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
         as={prevLinks  ? "a" : "span"}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">
    {/*Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
        {numberedLinks.map(link => (
             <Link
             key={link.lable}
             href={link.url}
             className={
              (link.active  
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300") +
                " inline-flex items-center border-t-2  px-4 pt-4 text-sm font-medium"}
           >
             {link.label}
           </Link>
        ))}
        {/* <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          1
        </a>
        Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <Link
          href={nextLink.url}
          className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          as={nextLink  ? "a" : "span"}
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Link>
      </div>
    </nav>
      </div>
    </>
    );
  }
  