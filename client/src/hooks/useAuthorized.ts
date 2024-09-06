import { useStore } from 'h/useStore'
import Cookies from 'js-cookie'
import { config } from 'l/config'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuthorized = () => {
  const { setProof } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (Cookies.get(config.cookie.name) !== 'true')
      navigate('/')
  }, [navigate])

  const logout = () => {
    setProof(null)
    Cookies.remove(config.cookie.name)
  }

  return { logout }
}
