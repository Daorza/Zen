import React from "react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

const features = [
  {
    icon: "💬",
    title: "Buat rencana",
    description: "“Mau ngerjain tugas Fisika besok malam.”",
  },
  {
    icon: "🪄",
    title: "Tersusun otomatis",
    description: "Jadwal akan tersusun secara otomatis.",
  },
  {
    icon: "🚀",
    title: "Tinggal lakukan",
    description: "Fokus ke tugas. AI yang mikir sisanya.",
  },
];

export default function Features() {
  return (
    <Section className="mx-8 rounded-2xl bg-slate-900/5 dark:bg-white/5 backdrop-blur-sm items-center flex" id="features">
      <Container className="space-y-10 text-center text-indigo-950 dark:text-mist-50">
        <h1 className="font-display text-4xl font-bold capitalize">
          Prompt, review, beres!
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-6 rounded-2xl border border-indigo-300/50 dark:border-indigo-100/20 bg-indigo-100/10 dark:bg-indigo-50/10 p-6 backdrop-blur-md transition hover:scale-105"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h2 className="font-display text-2xl font-bold">{feature.title}</h2>
              <p className="opacity-60 mb-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
