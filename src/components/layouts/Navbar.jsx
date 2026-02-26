import React from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

export function Navbar() {
  return (
    // desktop mode
    <header className="sticky top-0 z-50 bg-indigo-300/20 backdrop-blur-sm shadow-md">    
      <Container>
        <div className="hidden md:flex items-center justify-between h-16">
          <nav className="text-lg font-bold capitalize text-mist-50">
            Zen Planner   
          </nav>

          <Button variant='secondary' className="font-bold hover:shadow-lg hover:shadow-indigo-50 hover:scale-105 transition-transform duration-200 border border-indigo-200 rounded-2xl">
              Get Started
          </Button>
        </div>
      </Container>
    </header>
  )
}
