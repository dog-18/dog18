'use client'
import { Footer } from 'c/Footer'
import { Header } from 'c/Header'
import { StoreProvider } from 'easy-peasy'
import { store } from 'l/store'
import type { ReactNode } from 'react'

export const Layout = ({ children }: { children: ReactNode }) => (
  <StoreProvider store={store}>
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow px-4'>
        {children}
      </main>
      <Footer />
    </div>
  </StoreProvider>
)
