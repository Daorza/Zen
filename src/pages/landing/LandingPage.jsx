import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BrainCircuit,
  CalendarCheck,
  MessageSquareText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Zap,
  ChevronDown,
} from "lucide-react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);


const PAIN_POINTS = [
  "Rencana yang cuma ada di kepala, tapi tidak pernah kesampaian.",
  "Pindah-pindah aplikasi sampai lupa mau ngapain.",
  "Nulis jadwal manual yang habiskan waktu lebih banyak dari kerjanya.",
];

const HOW_IT_WORKS = [
  {
    icon: MessageSquareText,
    step: "01",
    title: "Tuangkan idemu",
    desc: "Ketik seperti ngobrol. \"Besok meeting jam 3, abis itu gym, malam kerjain laporan.\" Itu saja.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "GenZen urai semuanya",
    desc: "GenZen AI memisahkan, menyusun, dan mendeteksi konflik jadwal secara otomatis \u2014 dalam hitungan detik.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Konfirmasi, tenang",
    desc: "Tinggal tekan simpan. Pikiran beres, jadwal rapi. Otak kamu bebas buat hal yang lebih penting.",
  },
];

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "Bahasa manusia",
    desc: "Tulis seperti kamu bicara. AI yang menyesuaikan, bukan kamu.",
  },
  {
    icon: Layers,
    title: "Aktivitas & catatan",
    desc: "Tugas, jadwal, dan catatan tersimpan rapi dalam satu tempat.",
  },
  {
    icon: Clock,
    title: "Deteksi konflik",
    desc: "Jadwal bentrok terdeteksi sebelum kamu lupa. Dapat peringatan langsung.",
  },
  {
    icon: Zap,
    title: "Instan, bukan manual",
    desc: "Dari satu kalimat jadi beberapa aktivitas terstruktur. Tidak perlu form panjang.",
  },
];

function GradientText({ children, className = "" }) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-500 via-indigo-400 to-cyan-400 dark:from-cyan-400 dark:via-indigo-400 dark:to-pink-400 ${className}`}
    >
      {children}
    </span>
  );
}

function GlassPanel({ children, className = "", ...props }) {
  return (
    <div
      className={`
        backdrop-blur-md border rounded-2xl
        bg-white/40 border-indigo-200/60 shadow-lg shadow-indigo-100/40
        dark:bg-white/5 dark:border-white/10 dark:shadow-indigo-900/30
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

function Hero({ navigate }) {
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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
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

function PainPoint() {
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
        opacity: 0, x: 60, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 80%" },
      });

      gsap.to(cardRef.current, {
        y: -100,
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
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6">
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

function HowItWorks() {
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
      className="min-h-screen flex items-center justify-center px-6 bg-slate-50/80 dark:bg-white/[0.02] border-y border-indigo-100 dark:border-white/5"
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

function FeaturesGrid() {
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
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6">
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

function CTA({ navigate }) {
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


export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-min-h-screen overflow-x-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white antialiased">
      <main>
        <Hero navigate={navigate} />
        <PainPoint />
        <HowItWorks />
        <FeaturesGrid />
        <CTA navigate={navigate} />
      </main>
    </div>
  );
}