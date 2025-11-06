"use client"

import { useState } from "react"
import {
  SignInButton,
  SignOutButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs"
import Link from "next/link"

interface MobileMenuProps {
  isAdmin: boolean
}

export default function MobileMenu({ isAdmin }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className='md:hidden'>
        <button
          type='button'
          className='inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground/80 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
          aria-controls='mobile-menu'
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className='sr-only'>Open main menu</span>
          {/* Hamburger icon */}
          {!isOpen ? (
            <svg
              className='block h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          ) : (
            <svg
              className='block h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='absolute top-16 left-0 right-0 md:hidden z-50'>
          <div className='px-4 pt-4 pb-6 space-y-3 bg-background border-b border-foreground/20 shadow-lg'>
            <SignedIn>
              {isAdmin && (
                <Link
                  href='/admin'
                  className='block px-4 py-3 text-base font-medium text-foreground hover:text-foreground/80 hover:bg-gray-100 rounded-md transition-colors'
                  onClick={closeMenu}
                >
                  🛡️ Admin Panel
                </Link>
              )}
              <div className='space-y-3 pt-2 border-t border-foreground/10'>
                <div className='flex items-center space-x-3 px-4 py-2'>
                  <UserButton afterSignOutUrl='/' />
                  <span className='text-sm text-foreground/80'>
                    Your Profile
                  </span>
                </div>
                <SignOutButton>
                  <button
                    className='w-full text-left px-4 py-3 text-base font-medium text-foreground hover:text-foreground/80 hover:bg-gray-100 rounded-md transition-colors'
                    onClick={closeMenu}
                  >
                    🚪 Sign Out
                  </button>
                </SignOutButton>
              </div>
            </SignedIn>
            <SignedOut>
              <div className='px-4 py-2'>
                <SignInButton mode='modal'>
                  <button
                    className='w-full text-left px-4 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors'
                    onClick={closeMenu}
                  >
                    🔐 Sign In
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/25 md:hidden'
          onClick={closeMenu}
          aria-hidden='true'
        />
      )}
    </>
  )
}
