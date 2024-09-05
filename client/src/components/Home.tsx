import viteLogo from '/vite.svg'
import reactLogo from '../assets/react.svg'
import '../App.css'
import { OpenPassportQRCode } from 'c/QrCode/OpenPassportQrCode'
import { useVerify } from 'h/useVerify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()
  const { error, valid } = useVerify()

  useEffect(() => {
    if (valid === true) navigate('/x')
    if (error)
      alert('Error')
  }, [error, navigate, valid])

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>PRNDOG</h1>
      <OpenPassportQRCode userId={crypto.randomUUID()} />
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
