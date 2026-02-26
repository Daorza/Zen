import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Navbar } from './components/layouts/Navbar.jsx'
import { Footer } from './components/layouts/Footer.jsx'
import { Section } from './components/ui/Section.jsx'
import { Hero } from './components/landingpage/Hero.jsx'
import { ValueProposition } from './components/landingpage/ValueProposition.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
      <Section variant='default' size='md'>
        <App />
        <Hero />
        <ValueProposition />
      </Section>
    <Footer />
  </StrictMode>,
)
