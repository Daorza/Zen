import React from "react";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";

export default function Showcase() {
  return (
    <Section className="min-h-dvh">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-slate-700/20 dark:border-slate-50/20 shadow-xl">
          <nav className="flex items-center justify-between bg-slate-500/40 dark:bg-slate-500/40 px-6 py-4 border border-slate-700/20 dark:border-slate-50/20">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-600" />
              <div className="h-3 w-3 rounded-full bg-amber-600" />
              <div className="h-3 w-3 rounded-full bg-emerald-600" />
            </div>

            <h1 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-50">
              Ardi's Dashboard
            </h1>

            <div className="h-6 w-6 rounded-full border border-slate-400 bg-indigo-600" />
          </nav>

          <article className="grid grid-cols-1 md:grid-cols-3 min-h-[60vh] bg-transparent border border-slate-700/20 dark:border-slate-50/20">
            <aside className="space-y-4 bg-slate-500/40 dark:bg-slate-500/40 p-6 md:border-r border-slate-700/20 dark:border-slate-50/20 hidden md:block">
              <div className="h-6 w-2/5 rounded-lg bg-slate-600" />
              <div className="h-10 rounded-lg bg-slate-500" />
              <div className="h-10 rounded-lg bg-slate-600" />
              <div className="h-10 rounded-lg bg-slate-800" />
            </aside>

            <section className="flex flex-col justify-end gap-6 p-6 border-y md:border-y-0 md:border-x border-slate-700/20 dark:border-slate-50/20 text-sm">
              <div className="flex justify-end">
                <div className="max-w-xs rounded-2xl rounded-br-sm bg-indigo-600 dark:bg-indigo-700 p-4 text-white">
                  Besok ada rapat himpunan jam 3 sore lanjut kerja kelompok di
                  cafe jam 8
                </div>
              </div>

              <div className="flex justify-start">
                <div className="max-w-xs rounded-2xl rounded-bl-sm bg-slate-600 dark:bg-slate-500 p-4 text-white">
                  Siap bos! Jadwal rapat & kerja kelompok sudah masuk ke
                  antrean. Saya bantu ingetin 15 menit sebelumnya ya!
                </div>
              </div>
            </section>

            <aside className="space-y-4 bg-slate-500/40 dark:bg-slate-500/40 p-6 md:border-l border-slate-700/20 dark:border-slate-50/20 hidden md:block">
              <p className="text-xs font-bold uppercase tracking-wider text-white">
                Rencana hari ini
              </p>

              <div className="rounded-xl border border-indigo-400 bg-indigo-800 p-4 text-white">
                <h3 className="text-xs font-bold">10:30</h3>
                <p className="mt-2 font-semibold">Revisi tugas Aljabar II</p>
              </div>

              <div className="rounded-xl border border-slate-400 bg-slate-800 p-4 text-white opacity-40">
                <h3 className="text-xs font-bold">16:00</h3>
                <p className="mt-2 font-semibold">
                  First Gathering Kelompok Belajar Coding
                </p>
              </div>

              <div className="rounded-xl border border-slate-400 bg-slate-800 p-4 text-white opacity-40">
                <h3 className="text-xs font-bold">19:20</h3>
                <p className="mt-2 font-semibold">
                  Diskusi Tugas Algoritma Lanjutan
                </p>
              </div>
            </aside>
          </article>
        </div>
      </Container>
    </Section>
  );
}
