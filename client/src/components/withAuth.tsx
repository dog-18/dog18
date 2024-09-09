import { useAuthorized } from 'h/useAuthorized'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { ComponentType } from 'react'

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  return function WithAuth(props: P) {
    const { auth, loading } = useAuthorized()
    const router = useRouter()
    useEffect(() => {
      if (auth === false) {
        alert('Nice try! But we need to verify your age first.')
        router.push('/login')
      }
    }, [loading])
    if (auth === false || loading === true)
      return null

    return <Component {...props} />
  }
}
