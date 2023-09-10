import { useContext, useState } from 'react'
import Profile from './assets/components/Profile'
import Begin from './assets/components/Begin'
import AuthContext from './context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (isLoading) return <></>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Profile /> : <Begin />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
