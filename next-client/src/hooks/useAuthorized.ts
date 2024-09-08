import { useStore } from 'h/useStore'
import Cookies from 'js-cookie'
import { config } from 'l/config'
import { useEffect, useState } from 'react'

export const useAuthorized = () => {
  const { auth, setAuth, setProof } = useStore()
  const [loading, setLoading] = useState(true)

  const logout = () => {
    setAuth(false)
    setProof(null)
    Cookies.remove(config.cookie.name)
  }

  useEffect(() => {
    setAuth(Cookies.get(config.cookie.name) === 'true')
    setLoading(false)
  }, [setAuth])

  return { auth, loading, logout }
}
