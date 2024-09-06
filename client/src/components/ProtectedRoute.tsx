import { useAuthorized } from 'h/useAuthorized'
import type { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute: FC = () => {
  const { auth, loading } = useAuthorized()

  if (loading)
    return null

  if (auth === false) {
    alert('Nice try! But we need to verify your age first.')
    return <Navigate replace to='/' />
  }

  return <Outlet />
}
