import {auth,currentUser} from "@clerk/nextjs/server"

export default async function DashboardPage() {
  const authObject = await auth()
  const userObject = await currentUser()

  console.log("Auth Object:", authObject)
  console.log("User Object:", userObject)

  return (
    <div>
      <h1>Dashboard</h1>
    
    </div>
  )
}
