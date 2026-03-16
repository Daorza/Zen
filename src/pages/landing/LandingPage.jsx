import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Hero from "../../components/landingpage/Hero";
import ValueProposition from "../../components/landingpage/ValueProposition";
import Showcase from "../../components/landingpage/Showcase";
import Features from "../../components/landingpage/Features";
import CTA from "../../components/landingpage/CTA";

gsap.registerPlugin(ScrollTrigger);

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
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white antialiased">
      <main>
        <Hero navigate={navigate} />
        <ValueProposition />
        <Showcase />
        <Features />
        <CTA />
      </main>
    </div>
  );
}