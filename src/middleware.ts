import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

//const isProtectedRoute = createRouteMatcher("/user-profile")
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)?",
  "/sign-up(.*)?",
  "/manifest.json",
  "/sw.js",
  "/workbox-(.*).js",
])

const isAdminRoute = createRouteMatcher("/admin(.*)?")

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn()
  }

  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", req.url))
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // Also exclude PWA files: manifest.json, sw.js, workbox files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|manifest\\.json|sw\\.js|workbox-.*\\.js).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
