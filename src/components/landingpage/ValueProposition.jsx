import React from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function ValueProposition() {
  return (
    <Section className="min-h-dvh flex items-center">
      <Container className="text-center space-y-6 text-indigo-950 dark:text-mist-50">
        <section className="grid grid-cols-2 justify-center items-center gap-16">
          <div className="space-y-8 text-left">
            <h1 className="text-5xl font-black">
              Beban mental is real!
            </h1>

            <p className="text-justify max-w-lg opacity-75">
              Beban mental itu nyata. Kenapa kamu butuh BESOK? Karena otakmu
              didesain untuk berpikir, bukan untuk mengingat daftar yang tidak
              ada habisnya. Terlalu banyak aplikasi, terlalu banyak keputusan.
            </p>

            <section className="space-y-2 text-left">
              <div className="flex gap-4 items-center">
                <CheckIcon className="size-4 font-bold text-indigo-950 dark:text-amber-300" />
                <p>Rencana hanya ada di kepala</p>
              </div>

              <div className="flex gap-4 items-center">
                <CheckIcon className="size-4 font-bold text-indigo-950 dark:text-amber-300" />
                <p>Malas buka-tutup banyak aplikas</p>
              </div>

              <div className="flex gap-4 items-center">
                <CheckIcon className="size-4 font-bold text-indigo-950 dark:text-amber-300" />
                <p>Butuh jadwal instan, bukan manual input</p>
              </div>
            </section>
          </div>

          <div
            className="flex items-center justify-center backdrop-blur-lg border rounded-2xl p-8 m-4 rotate-3 h-full 
                                dark:bg-mist-50/10  dark:border-white/20 bg-indigo-950/10 border-indigo-300/40"
          >
            <div className="space-y-6">
              <div className="flex justify-center text-7xl">😫</div>
              <p className="text-sm font-medium mt-4 dark:text-mist-50/80">
                "Gimana ya ngerjain tugas, kuis, proyek, lomba, dan <br />
                rapat organisasi dalam satu hari?"
              </p>
            </div>
          </div>
        </section>
      </Container>
    </Section>
  );
}
