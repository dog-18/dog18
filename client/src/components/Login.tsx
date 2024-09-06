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

  return (
    <div className='flex flex-col justify-center items-center'>
      <OpenPassportQRCode userId={crypto.randomUUID()} />
      <div>
        Scan this 👆 with your OpenPassport mobile app:
        <a
          className='underline ml-2'
          href='https://apps.apple.com/us/app/proof-of-passport/id6478563710'
          target='_blank'
          rel='noopener noreferrer'
        >
          iOS
        </a>
        <a
          className='underline ml-2'
          href='https://play.google.com/store/apps/details?id=com.proofofpassportapp'
          target='_blank'
          rel='noopener noreferrer'
        >
          Android
        </a>
      </div>
    </div>
  )
}
