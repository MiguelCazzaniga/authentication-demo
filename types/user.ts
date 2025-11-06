import { Roles } from "./global"

export interface SerializedUser {
  id: string
  firstName: string | null
  lastName: string | null
  emailAddresses: Array<{ emailAddress: string }>
  publicMetadata: { role?: Roles }
  createdAt: number
  lastSignInAt: number | null
}