import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/satoshi.css'
import '../styles/clash-display.css'
import '../styles/clash-grotesk.css'
import '../styles/index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
