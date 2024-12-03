import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export function Page404() {
  return (
    <div className="my-[30vh]">
      <div className="text-center">
        <p className="text-5xl font-semibold text-white">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
          <button
            type="button"
            onClick={()=>{window.history.back()}}
            className="inline-flex items-center rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go back
          </button>
          <Link
            to="/signIn"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}