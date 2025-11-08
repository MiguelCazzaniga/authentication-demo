import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import Navigation from "@/components/navigation"
import PWAInstallPrompt from "@/components/PWAInstallPrompt"
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Authentication Demo PWA",
  description:
    "A Progressive Web App for user authentication with role management",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "pwa", "authentication", "clerk"],
  authors: [{ name: "Your Name" }],
  icons: [
    { rel: "apple-touch-icon", url: "/icon-192x192.svg" },
    { rel: "icon", url: "/favicon.svg" },
    { rel: "shortcut icon", url: "/favicon.svg" },
  ],
}

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <head>
          <meta name='application-name' content='Authentication Demo PWA' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          <meta name='apple-mobile-web-app-title' content='Auth Demo' />
          <meta
            name='description'
            content='A Progressive Web App for user authentication'
          />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-TileColor' content='#000000' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />
          <link rel='apple-touch-icon' href='/icon-192x192.svg' />
          <link
            rel='apple-touch-icon'
            sizes='192x192'
            href='/icon-192x192.svg'
          />
          <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/favicon.svg' />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navigation />
          {children}
          <PWAInstallPrompt />
          <ServiceWorkerRegistration />
        </body>
      </html>
    </ClerkProvider>
  )
}
