"use client"

import { useState, useMemo } from "react"
import UserCard from "./UserCard"
import { Roles } from "../../types/global"
import { SerializedUser } from "../../types/user"

interface UsersListProps {
  users: SerializedUser[]
}

export default function UsersList({ users }: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<Roles | "all">("all")
  const [sortBy, setSortBy] = useState<"name" | "email" | "role" | "created">(
    "name"
  )

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.emailAddresses[0]?.emailAddress
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      const matchesRole =
        roleFilter === "all" ||
        (user.publicMetadata?.role || "user") === roleFilter

      return matchesSearch && matchesRole
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          const nameA = `${a.firstName || ""} ${a.lastName || ""}`.trim()
          const nameB = `${b.firstName || ""} ${b.lastName || ""}`.trim()
          return nameA.localeCompare(nameB)
        case "email":
          return (a.emailAddresses[0]?.emailAddress || "").localeCompare(
            b.emailAddresses[0]?.emailAddress || ""
          )
        case "role":
          const roleA = a.publicMetadata?.role || "user"
          const roleB = b.publicMetadata?.role || "user"
          return roleA.localeCompare(roleB)
        case "created":
          return b.createdAt - a.createdAt
        default:
          return 0
      }
    })
  }, [users, searchTerm, roleFilter, sortBy])

  const roleCount = useMemo(() => {
    return users.reduce((acc, user) => {
      const role = user.publicMetadata?.role || "user"
      acc[role] = (acc[role] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [users])

  return (
    <div className='space-y-6'>
      {/* Stats */}
      <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4'>User Statistics</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-gray-900'>
              {users.length}
            </div>
            <div className='text-sm text-gray-600'>Total Users</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-red-600'>
              {roleCount.admin || 0}
            </div>
            <div className='text-sm text-gray-600'>Admins</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-yellow-600'>
              {roleCount.editor || 0}
            </div>
            <div className='text-sm text-gray-600'>Editors</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-gray-600'>
              {roleCount.user || 0}
            </div>
            <div className='text-sm text-gray-600'>Users</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label
              htmlFor='search'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Search Users
            </label>
            <input
              type='text'
              id='search'
              placeholder='Search by name or email...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label
              htmlFor='role-filter'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Filter by Role
            </label>
            <select
              id='role-filter'
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as Roles | "all")}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='all'>All Roles</option>
              <option value='admin'>Admin</option>
              <option value='editor'>Editor</option>
              <option value='user'>User</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='sort-by'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Sort By
            </label>
            <select
              id='sort-by'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='name'>Name</option>
              <option value='email'>Email</option>
              <option value='role'>Role</option>
              <option value='created'>Created Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold text-gray-900'>
          Users ({filteredAndSortedUsers.length})
        </h2>
      </div>

      {/* Users Grid */}
      {filteredAndSortedUsers.length === 0 ? (
        <div className='bg-white rounded-lg shadow-md p-12 border border-gray-200 text-center'>
          <div className='text-gray-500'>
            {searchTerm || roleFilter !== "all"
              ? "No users match your search criteria."
              : "No users found."}
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filteredAndSortedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
