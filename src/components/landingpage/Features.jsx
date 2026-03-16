import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GradientText, GlassPanel, FEATURES } from "./shared";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0, y: 40, duration: 0.8,
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });

      const cards = gridRef.current?.querySelectorAll(".feat-card");
      if (cards) {
        gsap.from(cards, {
          opacity: 0, y: 40, stagger: 0.1, duration: 0.6,
          scrollTrigger: { trigger: gridRef.current, start: "top 75%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-12 sm:py-0 flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <div ref={headRef} className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400">
            Yang kamu dapat
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Dibangun buat <GradientText>Gen Z yang nggak mau ribet.</GradientText>
          </h2>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map((feat, i) => (
            <div key={i} className="feat-card group">
              <GlassPanel className="p-6 flex gap-4 items-start h-full hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors duration-300">
                  <feat.icon size={18} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{feat.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </GlassPanel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
