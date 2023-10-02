import { useContext, useState } from 'react'
import Profile from './assets/components/Profile'
import Begin from './assets/components/Begin'
import Home from './assets/components/Home'
import AuthContext from './context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound404 from './assets/components/error/NotFound404'
import MapView from './assets/components/MapView'

function App() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (isLoading) return <></>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Begin />} />
        <Route path="/Profile" element={isAuthenticated ? <Profile /> : <Begin />} />
        <Route path="/Events" element={isAuthenticated ? <Home /> : <Begin />} />
        <Route path="/Map" element={isAuthenticated ? <MapView /> : <Begin />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
