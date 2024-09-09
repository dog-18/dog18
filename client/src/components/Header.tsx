'use client'
import { useAuthorized } from 'h/useAuthorized'
import { config } from 'l/config'
import Image from 'next/image'
import Link from 'next/link'
export const Header = () => {
  const { auth, loading, logout } = useAuthorized()

  const render = () => {
    if (loading === true) return <Image alt='spinner' height={50} src='/spinner.svg' width={50} />
    if (auth === true) {
      return (
        <>
          <li className='self-center'>
            <Link href='/x'>Restricted content</Link>
          </li>
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
