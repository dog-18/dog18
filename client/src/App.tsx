import { Home } from 'c/Home'
import { ProtectedPage } from 'c/ProtectedPage'
import { useAuthorized } from 'h/useAuthorized'
import { useVerify } from 'h/useVerify'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const { error, valid } = useVerify()

  useEffect(() => {
    if (valid === true) navigate('/x')
    if (error)
      alert('Error')
  }, [error, navigate, valid])

  return (
    <Routes>
      <Route path='/x' element={<ProtectedPage />} />
      <Route path='/' element={<Home />} />
      {/* Catch-all route to redirect unknown paths to the home page */}
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  )
}

export default App
