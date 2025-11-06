import RoleManager from './RoleManager'
import { Roles } from '../../types/global'
import { SerializedUser } from '../../types/user'

interface UserCardProps {
  user: SerializedUser
}

export default function UserCard({ user }: UserCardProps) {
  const displayName = user.firstName || user.lastName
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
    : 'No name provided'

  const primaryEmail = user.emailAddresses[0]?.emailAddress || 'No email'
  
  const currentRole = user.publicMetadata?.role || 'user'
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRoleBadgeColor = (role: Roles) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'editor':
        return 'bg-yellow-100 text-yellow-800'
      case 'user':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {displayName}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{primaryEmail}</p>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-500">Current Role:</span>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(currentRole)}`}
            >
              {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
          <div>
            <span className="font-medium">Created:</span>{' '}
            {formatDate(user.createdAt)}
          </div>
          <div>
            <span className="font-medium">Last Sign In:</span>{' '}
            {user.lastSignInAt ? formatDate(user.lastSignInAt) : 'Never'}
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Manage Role:
          </span>
          <RoleManager user={user} />
        </div>
      </div>
    </div>
  )
}