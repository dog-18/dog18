import { OpenPassportQRCode } from 'c/QrCode/OpenPassportQrCode'
import { useVerify } from 'h/useVerify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const { error, valid } = useVerify()

  useEffect(() => {
    if (valid === true) navigate('/x')
    if (error)
      alert('Error')
  }, [error, navigate, valid])

  return <OpenPassportQRCode userId={crypto.randomUUID()} />
}
