import React from 'react'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'

export function ValueProposition() {
  return (
    <Section>
        <Container className="text-center space-y-6 text-indigo-950 dark:text-mist-50">
            <section className="grid grid-cols-2 justify-center items-center">
                <div>
                    1st grid
                </div>

                <div className="flex items-center justify-center backdrop-blur-lg border rounded-2xl p-8 -skew-2 h-full
                                dark:bg-mist-50/10  dark:border-white/20 bg-indigo-950/10 border-indigo-300/20">
                    🎊
                </div>
            </section>
        </Container>
    </Section>
  )
}
