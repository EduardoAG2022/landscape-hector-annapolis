import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Thanks from './pages/Thanks'

const isThanks = window.location.pathname.startsWith('/thanks')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isThanks ? <Thanks /> : <App />}
  </StrictMode>
)
