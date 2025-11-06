import { clerkClient, auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import UsersList from "../../components/UsersList"
import { Roles } from "../../../types/global"
import { SerializedUser } from "../../../types/user"

export default async function AdminPage() {
  // Check if user is admin
  const { sessionClaims } = await auth()
  if (sessionClaims?.metadata?.role !== "admin") {
    redirect("/")
  }

  // Fetch all users
  const client = await clerkClient()
  const clerkUsers = (await client.users.getUserList()).data

  // Transform Clerk users to serializable plain objects
  const users: SerializedUser[] = clerkUsers.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddresses: user.emailAddresses.map((email) => ({
      emailAddress: email.emailAddress,
    })),
    publicMetadata: user.publicMetadata as { role?: Roles },
    createdAt: user.createdAt,
    lastSignInAt: user.lastSignInAt,
  }))

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>User Management</h1>
          <p className='mt-2 text-gray-600'>
            Manage user roles and permissions across your application.
          </p>
        </div>

        <UsersList users={users} />
      </div>
    </div>
  )
}
