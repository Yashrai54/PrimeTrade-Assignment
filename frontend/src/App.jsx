import React, { useContext } from 'react'
import Signup from './pages/Signup'
import SignIn from './pages/Signin'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { ApiProvider, ApiContext } from '../context/ApiContext'
import ProtectedRoute from '../ProtectedRoute'
import './App.css'

const App = () => {
  return (
    <ApiProvider>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      
    </ApiProvider>
  )
}

export default App
