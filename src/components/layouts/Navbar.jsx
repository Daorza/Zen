import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

export function Navbar() {
  const { theme, setTheme } = useTheme();
  
  return (
    // desktop mode
    <header className="sticky top-0 z-50 bg-indigo-50/10 backdrop-blur-sm shadow-md">    
      <Container>
        <div className="hidden md:flex items-center justify-between h-16">
          <nav className="text-lg font-bold capitalize text-indigo-950 dark:text-mist-50">
            Zen Planner   
          </nav>

          <div className="flex items-center gap-4">
            <Button variant='secondary' className="font-bold hover:shadow-lg hover:shadow-indigo-50 hover:scale-105 transition-transform duration-200 border border-indigo-200 rounded-2xl">
                Get Started
            </Button>

            <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-indigo-950 dark:text-mist-50"
              >
                {theme === "dark" ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
