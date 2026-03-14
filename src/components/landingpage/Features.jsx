import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import GlassCard from "../ui/GlassCard";

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
    <Section
      className="mx-8 rounded-2xl bg-slate-900/5 dark:bg-white/5 backdrop-blur-sm items-center flex"
      id="features"
    >
      <Container className="space-y-10 text-center text-indigo-950 dark:text-mist-50">
        <h1 className="font-display text-4xl font-bold capitalize">
          Prompt, review, beres!
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              className="p-6 flex flex-col items-center gap-6 even:bg-indigo-400/25 hover:transform hover:scale-105 duration-300"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h2 className="font-display text-2xl font-bold">
                {feature.title}
              </h2>
              <p className="opacity-60 mb-4">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
