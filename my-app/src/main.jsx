import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Redo from './Redo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Redo />
    <App />
    
  </StrictMode>,
)
