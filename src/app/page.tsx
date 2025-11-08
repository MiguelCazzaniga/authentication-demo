import Counter from "@/components/counter"
import Image from "next/image"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Hero Section */}
        <div className='text-center mb-12'>
          <div className='flex justify-center mb-6'>
            <Image
              className='dark:invert'
              src='/next.svg'
              alt='Next.js logo'
              width={180}
              height={36}
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            🚀 Authentication Demo PWA
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            A Progressive Web App showcasing user authentication, role
            management, and offline capabilities
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='text-3xl mb-4'>🔐</div>
            <h3 className='text-lg font-semibold mb-2'>
              Secure Authentication
            </h3>
            <p className='text-gray-600'>
              Powered by Clerk with role-based access control
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='text-3xl mb-4'>📱</div>
            <h3 className='text-lg font-semibold mb-2'>Progressive Web App</h3>
            <p className='text-gray-600'>
              Install on any device, works offline
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md text-center'>
            <div className='text-3xl mb-4'>⚡</div>
            <h3 className='text-lg font-semibold mb-2'>Fast & Responsive</h3>
            <p className='text-gray-600'>
              Optimized for speed and mobile devices
            </p>
          </div>
        </div>

        {/* Interactive Counter */}
        <div className='max-w-md mx-auto mb-12'>
          <Counter />
        </div>

        {/* Action Buttons */}
        <SignedIn>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Explore Features
            </h2>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/admin'
                className='px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium'
              >
                🛡️ Admin Panel
              </Link>
              <Link
                href='/user-profile'
                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
              >
                👤 User Profile
              </Link>
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <div className='text-center bg-white p-8 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Welcome! 👋
            </h2>
            <p className='text-gray-600 mb-6'>
              Sign in to access all features including the interactive counter,
              admin panel, and user management.
            </p>
            <div className='text-sm text-gray-500'>
              Click &quot;Sign In&quot; in the navigation bar to get started
            </div>
          </div>
        </SignedOut>

        {/* Footer Links */}
        <div className='flex flex-col gap-4 text-base font-medium sm:flex-row justify-center mt-12'>
          <a
            className='flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-5 text-white transition-colors hover:bg-gray-800 md:w-[158px]'
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              className='invert'
              src='/vercel.svg'
              alt='Vercel logomark'
              width={16}
              height={16}
              style={{ width: 'auto', height: 'auto' }}
            />
            Deploy Now
          </a>
          <a
            className='flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 md:w-[158px]'
            href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            📚 Documentation
          </a>
        </div>
      </div>
    </div>
  )
}
