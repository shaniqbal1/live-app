import React from 'react'
import { Outlet } from 'react-router-dom'
import {AuthProvider} from "./context/auth.context.jsx"
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <AuthProvider>
      <Outlet />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '12px',
            padding: '16px 24px',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </AuthProvider>
  )
}

export default App
