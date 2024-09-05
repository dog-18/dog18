import { useAuthorized } from 'h/useAuthorized'
import { useStore } from 'h/useStore'
import type { ComponentType, FC } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  component: ComponentType
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component }) => {
  useAuthorized()
  const { authorized } = useStore()

  return authorized ? <Component /> : <Navigate to='/' replace />
}
