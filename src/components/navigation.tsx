import { SignInButton, SignOutButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import MobileMenu from "./MobileMenu"

export default async function Navigation() {
  const { sessionClaims } = await auth()
  const isAdmin = sessionClaims?.metadata?.role === "admin"

  return (
    <nav className='bg-background border-b border-foreground shadow-sm relative z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          {/* Logo/Brand */}
          <div className='shrink-0'>
            <Link 
              href="/" 
              className='text-xl font-semibold text-foreground hover:text-foreground/80 transition-colors'
            >
              Next.js App
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:space-x-4'>
            <SignedIn>
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground/80 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              <div className="flex items-center space-x-3">
                <UserButton afterSignOutUrl="/" />
                <SignOutButton>
                  <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground/80 hover:bg-gray-100 rounded-md transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode='modal'>
                <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground/80 hover:bg-blue-100 rounded-md transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile menu component */}
          <MobileMenu isAdmin={isAdmin} />
        </div>
      </div>
    </nav>
  )
}
