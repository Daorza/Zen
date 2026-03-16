import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GradientText, GlassPanel, HOW_IT_WORKS } from "./shared";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0, y: 40, duration: 0.8,
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });

      stepsRef.current.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 50, duration: 0.7, delay: i * 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        });
      });

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-12 sm:py-0 bg-slate-50/80 dark:bg-white/[0.02] border-y border-indigo-100 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16 relative">
        <div className="absolute top-[20%] bottom-0 -left-6 lg:-left-12 w-1 bg-indigo-100 dark:bg-white/5 rounded-full hidden md:block overflow-hidden">
          <div ref={lineRef} className="w-full bg-gradient-to-b from-fuchsia-500 via-indigo-500 to-cyan-500 rounded-full" />
        </div>
        <div ref={headRef} className="text-center space-y-4 max-w-2xl mx-auto relative z-10">
          <p className="text-xs font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400">
            Cara kerjanya
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Tiga langkah. <GradientText>Satu ketenangan.</GradientText>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">
            Tidak ada kurva belajar. Tidak perlu setup panjang. Langsung tuangkan, langsung tenang.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((item, i) => (
            <div
              key={i}
              ref={(el) => (stepsRef.current[i] = el)}
              className="relative"
            >
              <GlassPanel className="p-6 h-full space-y-4 group hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors duration-300">
                <span className="text-5xl font-black text-indigo-100 dark:text-white/5 leading-none select-none">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors duration-300">
                  <item.icon size={18} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </GlassPanel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
