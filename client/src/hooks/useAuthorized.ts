import Cookies from 'js-cookie'
import { config } from 'l/config'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuthorized = () => {
  const router = useRouter()

  useEffect(() => {
    const authorized = Cookies.get(config.cookie.name)
    if (authorized !== 'true') router.push('/')
  }, [router])
}
