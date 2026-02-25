import React from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

export function Navbar() {
  return (
    // desktop mode
    <header className="sticky top-0 z-50 bg-indigo-950/90 backdrop-blur-sm border-b border-indigo-900/40">    
      <Container>
        <div className="hidden md:flex items-center justify-between h-16">
          <nav className="text-lg font-bold capitalize text-mist-50">
            Zen Planner   
          </nav>

          <Button variant='secondary'>
              Get Started
          </Button>
        </div>
      </Container>
    </header>
  )
}
