import React from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

export function Navbar() {
  return (
    // desktop mode
    <header className="hidden md:flex h-16 sticky top-0 z-50 bg-bg-primary/50 backdrop-blur-sm border-b border-border-default">    
      <Container>
        <div className="flex items-center justify-between h-16">
          <nav className="text-lg font-bold capitalize text-fg-primary">
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
