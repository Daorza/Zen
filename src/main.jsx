import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Navbar } from './components/layouts/Navbar.jsx'
import { Footer } from './components/layouts/Footer.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
      <App />
    <Footer />
  </StrictMode>,
)
