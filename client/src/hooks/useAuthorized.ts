import { useStore } from 'h/useStore'
import Cookies from 'js-cookie'
import { config } from 'l/config'
import { useEffect } from 'react'

export const useAuthorized = () => {
  const { setAuthorized, setProof } = useStore()

  useEffect(() => {
    if (Cookies.get(config.cookie.name) === 'true')
      setAuthorized(true)
  }, [setAuthorized])

  const logout = () => {
    setAuthorized(false)
    setProof(null)
    Cookies.remove(config.cookie.name)
  }

  return { logout }
}
