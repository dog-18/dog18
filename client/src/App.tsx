import { Footer } from 'c/Footer'
import { Header } from 'c/Header'
import { Landing } from 'c/Landing'
import { Login } from 'c/Login'
import { ProtectedRoute } from 'c/ProtectedRoute'
import { X } from 'c/X'
import { Navigate, Route, Routes } from 'react-router-dom'

export const App = () => (
  <div className='flex flex-col min-h-screen'>
    <Header />
    <main className='flex-grow px-4'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/x' element={<X />} />
        </Route>
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </main>
    <Footer />
  </div>
)
