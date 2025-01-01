import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import Login from './auth/Login/Login'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
