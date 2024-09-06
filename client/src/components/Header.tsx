import { useAuthorized } from 'h/useAuthorized'
import { config } from 'l/config'
import { useNavigate } from 'react-router-dom'
export const Header = () => {
  const navigate = useNavigate()
  const { logout } = useAuthorized()

  return (
    <header className='navbar flex justify-between items-center p-4'>
      <div className='flex items-center'>
        <a className='logo text-white text-2xl font-bold mr-4' href='/'>{config.appName.toUpperCase()}</a>
      </div>
      <nav className='flex items-center'>
        <ul className='flex space-x-4 mr-8'>
          <li>
            <a href='/x'>Restricted pictures</a>
          </li>
        </ul>
        <ul className='flex space-x-4'>
          <li>
            <button
              onClick={() => {
                navigate('/login')
              }}
              type='button'
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              type='button'
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
