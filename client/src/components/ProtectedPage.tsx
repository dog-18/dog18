import Cookies from 'js-cookie'
import { config } from 'l/config'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function ProtectedPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const authorized = Cookies.get(config.cookie.name)
    if (authorized !== 'true') navigate('/')
  }, [navigate])

  return <h1>Protected Page</h1>
}
