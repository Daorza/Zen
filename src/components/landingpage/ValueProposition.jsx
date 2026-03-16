import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Clock } from "lucide-react";
import { GradientText, GlassPanel, PAIN_POINTS } from "./shared";

gsap.registerPlugin(ScrollTrigger);

export default function ValueProposition() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const itemsRef = useRef([]);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0, y: 40, duration: 0.8,
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });

      itemsRef.current.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, x: -30, duration: 0.6, delay: i * 0.12,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from(cardRef.current, {
        opacity: 0, y: 200, x: 60, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 80%" },
      });

      gsap.to(cardRef.current, {
        y: 0,
        rotationZ: 3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-12 sm:py-0 flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-10">
          <div ref={headRef} className="space-y-4 max-w-2xl">
            <p className="text-xs font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400">
              Kamu nggak sendiri
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              Sistem yang kamu pakai <GradientText>yang bermasalah.</GradientText>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base">
              Di kepala Gen Z hari ini, ada terlalu banyak ide, tekanan, dan kemungkinan yang berputar sekaligus.
              Kita bukan malas, tapi hanya bingung untuk memulai semua ini darimana. Genzen hadir memberikan solusi untuk kamu yang merasakan tantangan serupa
            </p>
          </div>

          <ul className="space-y-4">
            {PAIN_POINTS.map((point, i) => (
              <li
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={18} className="text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={cardRef}>
          <GlassPanel className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-indigo-100 dark:border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide">GenZen AI</span>
            </div>

            <div className="flex justify-end">
              <div className="max-w-[80%] bg-indigo-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-3 shadow-md shadow-indigo-400/20">
                Besok ada rapat jam 3, abis itu gym, terus malam kerjain laporan minggu depan
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-[80%] bg-white/70 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-sm rounded-2xl rounded-bl-sm px-4 py-3 border border-indigo-100 dark:border-white/10">
                Sudah aku catat semuanya! 3 kegiatan besok siap. Tenang dulu, semua beres.
              </div>
            </div>

            <div className="space-y-2 pt-1">
              {[
                { time: "15:00", title: "Rapat", type: "Jadwal", color: "bg-blue-500/10 text-blue-700 dark:text-blue-300" },
                { time: "17:00", title: "Gym", type: "Tugas", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
                { time: "19:00", title: "Kerjain laporan", type: "Tugas", color: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl
                    bg-white/60 dark:bg-white/5 border border-indigo-100 dark:border-white/10 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Clock size={12} className="text-slate-400" />
                    <span className="text-slate-500 dark:text-slate-400 font-mono">{item.time}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item.title}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md font-medium ${item.color}`}>{item.type}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <button className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors">
                Simpan semua
              </button>
              <button className="flex-1 py-2 rounded-xl border border-indigo-200 dark:border-white/20 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:border-indigo-400 transition-colors">
                Batal
              </button>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
