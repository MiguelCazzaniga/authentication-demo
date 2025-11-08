"use client"

import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      console.log("PWA: beforeinstallprompt event fired")
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallButton(true)
    }

    // Check if already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    if (isStandalone) {
      console.log("PWA: App is already installed")
      return
    }

    window.addEventListener("beforeinstallprompt", handler)

    // For debugging - always show button for testing
    const timeout = setTimeout(() => {
      console.log("PWA: Showing install prompt for testing")
      setShowInstallButton(true)
    }, 1000)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
      clearTimeout(timeout)
    }
  }, [deferredPrompt])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Manual installation instructions
      alert(
        "To install this PWA:\n\n" +
          "• Chrome/Edge: Click the install button in the address bar\n" +
          "• Safari: Share → Add to Home Screen\n" +
          "• Firefox: Menu → Install\n\n" +
          "Make sure you are using HTTPS for full PWA features!"
      )
      return
    }

    try {
      setIsLoading(true)
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      console.log("PWA: User choice outcome:", outcome)
      if (outcome === "accepted") {
        console.log("PWA: Installation accepted")
        setShowInstallButton(false)
        setDeferredPrompt(null)
      }
    } catch (error) {
      console.error("Error showing install prompt:", error)
      alert("Installation failed. Please try using the browser install option.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDismiss = () => {
    setShowInstallButton(false)
    setDeferredPrompt(null)
  }

  if (!showInstallButton) return null

  return (
    <div className='fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50'>
      <div className='bg-white border border-gray-200 rounded-lg shadow-lg p-4'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <h3 className='text-sm font-semibold text-gray-900 mb-1'>
              📱 Install App
            </h3>
            <p className='text-xs text-gray-600 mb-3'>
              Add this app to your home screen for quick access and offline use.
            </p>
            <div className='flex gap-2'>
              <button
                onClick={handleInstallClick}
                disabled={isLoading}
                className='px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md transition-colors'
              >
                {isLoading ? "Installing..." : "Install"}
              </button>
              <button
                onClick={handleDismiss}
                className='px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors'
              >
                Not now
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className='text-gray-400 hover:text-gray-600 ml-2'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
