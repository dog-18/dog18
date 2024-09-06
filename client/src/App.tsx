import { Footer } from 'c/Footer'
import { Header } from 'c/Header'
import { Landing } from 'c/Landing'
import { Login } from 'c/Login'
import { X } from 'c/X'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow px-4'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/x' element={<X />} />
          <Route path='/' element={<Landing />} />
          {/* Catch-all route to redirect unknown paths to the home page */}
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
