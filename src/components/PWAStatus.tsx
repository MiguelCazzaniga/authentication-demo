"use client"

import { useEffect, useState } from "react"

export default function PWAStatus() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isStandalone] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(display-mode: standalone)").matches
    }
    return false
  })
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    // Check if service worker is supported
    if ("serviceWorker" in navigator) {
      console.log("PWA: Service Worker supported")
      
      // Function to check service worker status
      const checkServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.getRegistration()
          const isReg = !!registration
          setIsRegistered(isReg)
          console.log("PWA: Service Worker check - registered:", isReg)
          
          if (registration) {
            console.log("PWA: SW Registration details:", {
              scope: registration.scope,
              active: !!registration.active,
              installing: !!registration.installing,
              waiting: !!registration.waiting,
              updateViaCache: registration.updateViaCache
            })
          } else {
            // If no registration found, try to manually register
            console.log("PWA: No service worker found, attempting manual registration...")
            try {
              const newRegistration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
              })
              console.log("PWA: Manual registration successful:", newRegistration)
              setIsRegistered(true)
            } catch (registerError) {
              console.error("PWA: Manual registration failed:", registerError)
            }
          }
        } catch (error) {
          console.error("PWA: Error checking service worker:", error)
          setIsRegistered(false)
        }
      }

      // Check immediately
      checkServiceWorker()

      // Check every 2 seconds for the first 30 seconds (service worker might take time to register)
      const interval = setInterval(() => {
        checkServiceWorker()
      }, 2000)

      // Stop checking after 30 seconds
      setTimeout(() => {
        clearInterval(interval)
      }, 30000)

      // Listen for service worker events
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("PWA: Service Worker controller changed")
        checkServiceWorker()
      })

      // Listen for registration updates
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("PWA: Service Worker message:", event.data)
      })

      return () => {
        clearInterval(interval)
      }
    } else {
      console.error("PWA: Service Worker not supported")
    }

    // Log standalone status
    console.log("PWA: Running in standalone mode:", isStandalone)

    // Check if app is installable
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setCanInstall(true)
      console.log("PWA: beforeinstallprompt event fired")
      console.log("PWA: App is installable - install prompt available")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall)
    }
  }, [isStandalone])

  // Only show in development or for debugging
  if (process.env.NODE_ENV === "production" && isStandalone) {
    return null
  }

  return (
    <div className='fixed top-4 right-4 bg-black text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs'>
      <div className='font-bold mb-2'>🔧 PWA Debug Status</div>
      <div className='space-y-1'>
        <div className={`${isRegistered ? "text-green-400" : "text-red-400"}`}>
          SW: {isRegistered ? "✅ Registered" : "❌ Not Found"}
        </div>
        <div
          className={`${isStandalone ? "text-green-400" : "text-yellow-400"}`}
        >
          Mode: {isStandalone ? "📱 Standalone" : "🌐 Browser"}
        </div>
        <div className={`${canInstall ? "text-green-400" : "text-red-400"}`}>
          Install: {canInstall ? "✅ Available" : "❌ Not Ready"}
        </div>
      </div>
    </div>
  )
}
