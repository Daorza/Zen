import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit, CalendarCheck, Sparkles, ArrowRight, Clock, ChevronDown } from "lucide-react";
import { GradientText } from "./shared";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ navigate }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const scrollHintRef = useRef(null);
  const shapesRef = useRef([]);
  shapesRef.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, { opacity: 0, y: -20, duration: 0.6 })
        .from(headlineRef.current.children, { opacity: 0, y: 60, stagger: 0.12, duration: 0.8 }, "-=0.2")
        .from(subRef.current, { opacity: 0, y: 30, duration: 0.7 }, "-=0.4")
        .from(ctaRef.current.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, "-=0.3")
        .from(scrollHintRef.current, { opacity: 0, duration: 0.5 }, "-=0.1");

      gsap.to(headlineRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      shapesRef.current.forEach((shape) => {
        if (!shape) return;
        const speed = parseFloat(shape.dataset.speed || "1");
        const rotation = parseFloat(shape.dataset.rotation || "0");
        gsap.to(shape, {
          y: -150 * speed,
          rotation: rotation,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen py-12 sm:py-0 flex flex-col py-12 sm:py-0 items-center justify-center text-center px-6 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-400/20 dark:bg-indigo-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-400/15 dark:bg-cyan-600/10 blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[300px] h-[300px] rounded-full bg-fuchsia-400/15 dark:bg-pink-600/10 blur-3xl" />

        <div ref={el => shapesRef.current[0] = el} data-speed="1.2" data-rotation="45" className="absolute top-[20%] left-[10%] opacity-20 dark:opacity-20 text-indigo-500 hidden md:block">
          <Sparkles size={64} strokeWidth={1.5} />
        </div>
        <div ref={el => shapesRef.current[1] = el} data-speed="2.5" data-rotation="-30" className="absolute top-[50%] right-[10%] opacity-20 dark:opacity-20 text-cyan-500 hidden md:block">
          <BrainCircuit size={80} strokeWidth={1.5} />
        </div>
        <div ref={el => shapesRef.current[2] = el} data-speed="0.8" data-rotation="15" className="absolute bottom-[20%] left-[20%] opacity-20 dark:opacity-20 text-fuchsia-500 hidden md:block">
          <Clock size={48} strokeWidth={1.5} />
        </div>
        <div ref={el => shapesRef.current[3] = el} data-speed="1.8" data-rotation="-15" className="absolute top-[25%] right-[25%] opacity-15 dark:opacity-15 text-pink-500 hidden md:block">
          <CalendarCheck size={56} strokeWidth={1.5} />
        </div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide
            bg-indigo-50 text-indigo-700 border border-indigo-200
            dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Generate your Zen Behaviour
        </div>

        <h1
          ref={headlineRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white"
        >
          <span className="block">Generate yours</span>
          <span className="block">
            <GradientText>Zen Behaviour.</GradientText>
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Tuangkan ide dan kegiatanmu dalam satu tools berbasis AI. Biarkan
          GenZen yang susun jadwal, bikin catatan, dan atur semua biar otakmu tetap tenang.
        </p>

        <div ref={ctaRef} className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/auth/login")}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm
              bg-indigo-600 text-white hover:bg-indigo-700
              shadow-lg shadow-indigo-300/40 dark:shadow-indigo-900/50
              hover:shadow-xl hover:shadow-indigo-400/40 hover:scale-105
              transition-all duration-200"
          >
            Generate your Zen
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm
              border border-indigo-200 dark:border-white/20
              text-slate-700 dark:text-slate-300
              hover:border-indigo-400 dark:hover:border-indigo-400
              hover:text-indigo-700 dark:hover:text-indigo-300
              transition-all duration-200"
          >
            Lihat cara kerjanya
          </a>
        </div>
      </div>
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600"
      >
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
