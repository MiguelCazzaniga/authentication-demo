import { SignInButton, SignOutButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

export default async function Navigation() {
  const { sessionClaims } = await auth()
  const isAdmin = sessionClaims?.metadata?.role === "admin"

  return (
    <nav className='bg-background border-b border-foreground'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          <div className='shrink-0'>
            <Link href="/" className='text-xl font-semibold text-foreground hover:text-foreground/80'>
              Next.js App
            </Link>
          </div>
          <div className='flex items-center space-x-4'>
            <SignedIn>
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-foreground/80 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
                >
                  Admin Panel
                </Link>
              )}
            </SignedIn>
            <SignedOut>
              <SignInButton mode='modal' />
            </SignedOut>
            <SignedIn>
              <SignOutButton />
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}
