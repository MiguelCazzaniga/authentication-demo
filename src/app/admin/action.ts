"use server"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { Roles } from "../../../types/global"
import { revalidatePath } from "next/cache"

export async function getAllUsers() {
  const { sessionClaims } = await auth()
  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Only admins can view users")
  }
  const client = await clerkClient()
  try {
    const users = await client.users.getUserList()
    return users.data
  } catch (error) {
    throw new Error("Error fetching users", { cause: error })
  }
}

export async function setRole(formData: FormData) {
  const { sessionClaims } = await auth()
  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Only admins can set roles")
  }
  const client = await clerkClient()
  const userId = formData.get("userId") as string
  const role = formData.get("role") as Roles

  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role }
    })
    revalidatePath("/admin")
  } catch (error) {
    throw new Error("Error updating user metadata", { cause: error })
  }
}

export async function removeRole(formData: FormData) {
  const { sessionClaims } = await auth()
  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Only admins can remove roles")
  }
  const client = await clerkClient()
  const userId = formData.get("userId") as string

  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: null }
    })
    revalidatePath("/admin")
  } catch (error) {
    throw new Error("Error updating user metadata", { cause: error })
  }
}