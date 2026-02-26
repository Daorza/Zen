import React from "react";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <Section>
      <Container className="text-center space-y-6 text-indigo-950 dark:text-mist-50">
        <section
          className="flex items-center justify-center gap-4 text-sm rounded-lg px-6 py-2 w-fit mx-auto backdrop-blur-lg pointer-events-none border 
                            dark:bg-mist-50/10  dark:border-white/20 bg-indigo-950/10 border-indigo-300/20"
        >
          <div className="size-4 rounded-full bg-emerald-500">
            {/* empty div */}
          </div>
          <p className="text-sm">
            Produktivitas tanpa batas!
          </p>
        </section>

        <header className="text-7xl font-black dark:text-mist-50 text-mist-950 ">
          Rencanakan hidupmu <br />
          <span className="bg-clip-text text-transparent bg-linear-to-br from-cyan-500 to-pink-500 dark:bg-linear-to-br dark:from-cyan-400 dark:to-pink-500">
            secepat dirimu berpikir
          </span>
        </header>

        <p className="text-mist-50/50 mt-4">
          Ubah pikiran yang kacau menjadi hari yang terorganisir sempurna. 
          Perencanaan berbasis AI <br /> yang benar-benar bekerja sesuai dengan cara
          kerja Anda.
        </p>

        <section className="flex items-center justify-center gap-6 mt-16 *:font-semibold *:px-8 *:text-lg *:rounded-2xl">
            <Button variant="secondary" className="hover:shadow-lg hover:shadow-indigo-400 hover:scale-105 transition-transform duration-200 border border-indigo-200 rounded-2xl">
                Mulai sekarang
            </Button>

            <Button variant="outline" className="hover:text-indigo-950">
                Pelajari lebih lanjut
            </Button>
        </section>
      </Container>
    </Section>
  );
}
