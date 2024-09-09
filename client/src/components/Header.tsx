'use client'
import { useAuthorized } from 'h/useAuthorized'
import { config } from 'l/config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BeatLoader } from 'react-spinners'

export const Header = () => {
  const { auth, loading, logout } = useAuthorized()
  const pathname = usePathname()

  const render = () => {
    if (loading === true) return <BeatLoader loading={true} size={10} color='#e0a3c8' />

    if (auth === true) {
      return (
        <>
          {!pathname.endsWith('/x') && (
            <li className='self-center'>
              <Link href='/x'>Restricted content</Link>
            </li>
          )}
          <li>
            <button onClick={logout} type='button'>Logout</button>
          </li>
        </>
      )
    }
    return (
      <li>
        <Link href='/login'>
          <button className='hover:text-lavender' type='button'>Login</button>
        </Link>
      </li>
    )
  }
  return (
    <header className='navbar flex justify-between items-center p-4'>
      <div className='flex items-center'>
        <a className='logo text-white text-2xl font-bold mr-4' href='/'>{config.appName.toUpperCase()}</a>
      </div>
      <nav className='flex items-center'>
        <ul className='flex space-x-4 mr-8'>
          {render()}
        </ul>
      </nav>
    </header>
  )
}
