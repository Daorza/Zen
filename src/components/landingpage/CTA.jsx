import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { Button } from '../ui/Button'

export default function CTA() {
  const navigate = useNavigate();

  return (
        <Section className="min-h-dvh flex items-center">
          <Container className="text-center space-y-6 text-indigo-950 dark:text-mist-50 items-center flex flex-col h-">
    
            <header className="text-4xl md:text-7xl font-black dark:text-mist-50 text-mist-950 ">
              Stop rencana <br />
              <span className="bg-clip-text text-transparent bg-linear-to-br from-pink-500 to-cyan-600 dark:bg-linear-to-br dark:from-cyan-400 dark:to-pink-500">
                mulai bertindak
              </span>
            </header>
    
            <section className="flex items-center justify-center gap-4 md:gap-8 mt-12 md:mt-16 *:font-semibold *:px-4 md:*:px-8 *:text-sm md:*:text-lg *:rounded-2xl">
                <Button variant="secondary" className="hover:shadow-lg hover:shadow-indigo-300 hover:scale-105 transition-transform duration-200 border border-indigo-200 rounded-2xl"
                    onClick={() => navigate("/auth/login")}>
                    Mulai sekarang
                </Button>
    
            </section>
          </Container>
        </Section>
  )
}
