"use client"

import Link from "next/link"

export default function Offline() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4'>
      <div className='max-w-md text-center'>
        <div className='mb-8'>
          <svg
            className='mx-auto h-24 w-24 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z'
            />
          </svg>
        </div>

        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
          📡 You&apos;re Offline
        </h1>

        <p className='text-lg text-gray-600 mb-8'>
          It looks like you&apos;ve lost your internet connection. Don&apos;t
          worry - you can still use some features of this app.
        </p>

        <div className='space-y-4'>
          <Link
            href='/'
            className='block w-full px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors'
          >
            🏠 Go to Home Page
          </Link>

          <button
            onClick={() => window.location.reload()}
            className='block w-full px-6 py-3 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-md font-medium transition-colors'
          >
            🔄 Try Again
          </button>
        </div>

        <div className='mt-8 p-4 bg-blue-50 rounded-lg'>
          <h3 className='text-sm font-semibold text-blue-900 mb-2'>
            💡 Tip for PWA Users
          </h3>
          <p className='text-sm text-blue-700'>
            This app works offline! You can still access previously viewed pages
            and use cached features.
          </p>
        </div>
      </div>
    </div>
  )
}
