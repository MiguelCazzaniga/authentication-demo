'use client';
import { useState } from "react";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/nextjs"

export default function Counter() {
  const [count, setCount] = useState(0)
  const { isLoaded, userId } = useAuth()
  const { isLoaded: isUserLoaded, user } = useUser()

  // Show loading state while auth is loading
  if (!isLoaded || !isUserLoaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <SignedIn>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">Count: {count}</p>
            <p className="text-sm text-gray-600 mt-1">
              Welcome, {user?.firstName || 'User'}! 👋
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            <button 
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              ➕ Increment
            </button>
            <button 
              onClick={() => setCount(count - 1)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              ➖ Decrement
            </button>
            <button 
              onClick={() => setCount(0)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </SignedIn>
      
      <SignedOut>
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            🔒 Please sign in to use the counter
          </p>
          <p className="text-sm text-gray-500">
            This component requires authentication
          </p>
        </div>
      </SignedOut>
    </div>
  )
}
      