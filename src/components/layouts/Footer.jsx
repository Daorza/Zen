import React from 'react'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="text-center py-6 border-t border-slate-950/20 dark:border-white/20">
      <Container>
        <p className="capitalize font-bold text-xs tracking-wider opacity-20">
          Genzen { new Date().getFullYear() } &copy; All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
