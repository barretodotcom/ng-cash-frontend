import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './components/Header/Header'
import Login from './Pages/Login/Login'
import Container from './routes/Container'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Container />
      </AuthProvider>
    </div>
  )
}

export default App
