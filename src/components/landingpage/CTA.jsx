import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { GradientText } from "./shared";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-indigo-400/10 dark:bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center" ref={contentRef}>
        <p className="text-xs font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400">
          Times to generate your <GradientText>Zen Behaviour</GradientText>
        </p>

        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight mt-4">
          Ide-idemu layak
          <br />
          <GradientText>diwujudkan.</GradientText>
        </h2>

        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg mt-6 leading-relaxed">
          Jangan biarin isi pikiranmu stuck di otak doang. Wujudkan idemu melalui GenZen,
          dan rasakan bedanya punya sistem yang bener-bener bekerja untukmu.
        </p>
        <div className="flex items-center justify-center gap-4 mt-12 flex-wrap">
          <button
            onClick={() => navigate("/auth/login")}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base
              bg-indigo-600 text-white hover:bg-indigo-700
              shadow-xl shadow-indigo-300/40 dark:shadow-indigo-900/50
              hover:shadow-2xl hover:shadow-indigo-400/40 hover:scale-105
              transition-all duration-200"
          >
            Generate my Zen
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-600 mt-4">
          Gratis. Tidak perlu kartu kredit.
        </p>
      </div>
    </section>
  );
}
