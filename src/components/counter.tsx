'use client';
import { use, useState } from "react";
import {useAuth,useUser} from "@clerk/nextjs"

export default function Counter() {
  const [count, setCount] = useState(0)
  const {isLoaded,userId,sessionId,getToken } = useAuth()
  const {isLoaded:isUserLoaded,isSignedIn, user} = useUser()

  if (!isLoaded || !userId ) {
    console.log("Auth or User data is not loaded yet.") 
    return null
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
      