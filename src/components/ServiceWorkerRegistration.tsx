"use client"

import { useEffect } from "react"

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox
      // Add event listeners to handle any of the generated workbox events
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      wb.addEventListener("controlling", () => {
        console.log("PWA: Service worker is controlling")
        window.location.reload()
      })

      wb.addEventListener("installed", (event: Event) => {
        console.log("PWA: Service worker installed:", event)
      })

      wb.addEventListener("updated", (event: Event) => {
        console.log("PWA: Service worker updated:", event)
      })

      wb.addEventListener("redundant", (event: Event) => {
        console.log("PWA: Service worker redundant:", event)
      })

      wb.addEventListener("waiting", (event: Event) => {
        console.log("PWA: Service worker waiting:", event)
      })

      // Register service worker
      wb.register()
        .then((registration: ServiceWorkerRegistration) => {
          console.log("PWA: Workbox service worker registered:", registration)
        })
        .catch((error: Error) => {
          console.error("PWA: Workbox service worker registration failed:", error)
        })
    } else if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Fallback manual registration if workbox is not available
      console.log("PWA: Workbox not available, using manual registration")
      
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          console.log("PWA: Manual service worker registered:", registration)
          
          registration.addEventListener("updatefound", () => {
            console.log("PWA: Service worker update found")
          })
        })
        .catch((error) => {
          console.error("PWA: Manual service worker registration failed:", error)
        })
    } else {
      console.log("PWA: Service workers not supported")
    }
  }, [])

  return null
}

declare global {
  interface Window {
    workbox: {
      register: () => Promise<ServiceWorkerRegistration>
      addEventListener: (event: string, callback: (event: Event) => void) => void
    }
  }
}