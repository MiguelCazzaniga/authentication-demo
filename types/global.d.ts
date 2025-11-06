export {}

export type Roles = "admin" | "editor" | "user";

declare global {
  interface CustomJwtSessionClaims {
   metadata:{ role?: Roles}
  } }