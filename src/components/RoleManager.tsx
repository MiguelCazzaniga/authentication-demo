"use client"

import { useState } from "react"
import { setRole, removeRole } from "../app/admin/action"
import { Roles } from "../../types/global"
import { SerializedUser } from "../../types/user"

interface RoleManagerProps {
  user: SerializedUser
}

const ROLES: Roles[] = ["admin", "editor", "user"]

export default function RoleManager({ user }: RoleManagerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Roles>(
    user.publicMetadata?.role || "user"
  )

  const handleRoleChange = async (newRole: Roles) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("userId", user.id)
      formData.append("role", newRole)

      await setRole(formData)
      setSelectedRole(newRole)
    } catch (error) {
      console.error("Error updating role:", error)
      alert("Failed to update role")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveRole = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("userId", user.id)

      await removeRole(formData)
      setSelectedRole("user")
    } catch (error) {
      console.error("Error removing role:", error)
      alert("Failed to remove role")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center gap-3'>
      <select
        value={selectedRole}
        onChange={(e) => handleRoleChange(e.target.value as Roles)}
        disabled={isLoading}
        className='px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
      >
        {ROLES.map((role) => (
          <option key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>

      <button
        onClick={handleRemoveRole}
        disabled={isLoading || selectedRole === "user"}
        className='px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Remove Role
      </button>

      {isLoading && (
        <div className='w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
      )}
    </div>
  )
}
