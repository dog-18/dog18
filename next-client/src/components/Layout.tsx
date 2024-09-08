import { Footer } from 'c/Footer'
import { Header } from 'c/Header'
import { ReactNode } from 'react'

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className='flex flex-col min-h-screen'>
    <Header />
    <main className='flex-grow px-4'>
      {children}
    </main>
    <Footer />
  </div>
)
