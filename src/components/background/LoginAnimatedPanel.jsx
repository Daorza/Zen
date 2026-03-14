const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

  .blob-1 { animation: blobFloat  8s ease-in-out infinite; }
  .blob-2 { animation: blobFloat  8s ease-in-out infinite; animation-delay: -3s; }
  .blob-3 { animation: blobFloat3 8s ease-in-out infinite; animation-delay: -5s; }

  .ring-pulse   { animation: ringPulse 4s ease-in-out infinite; }
  .ring-pulse-2 { animation: ringPulse 4s ease-in-out infinite; animation-delay: -1.3s; }
  .ring-pulse-3 { animation: ringPulse 4s ease-in-out infinite; animation-delay: -2.6s; }

  .orbit-sm { animation: orbitSpin  6s linear infinite; }
  .orbit-md { animation: orbitSpin 10s linear infinite reverse; }
  .orbit-lg { animation: orbitSpin 16s linear infinite; }

  .logo-float       { animation: logoFloat 3s ease-in-out infinite; }
  .hex-spin         { transform-origin: 28px 28px; animation: hexSpin 12s linear infinite; }
  .hex-spin-reverse { transform-origin: 28px 28px; animation: hexSpin  8s linear infinite reverse; }
  .pulse-dot        { animation: pulseDot 2s ease-in-out infinite; }

  .font-sora { font-family: 'Sora', sans-serif; }
  .font-dm   { font-family: 'DM Sans', sans-serif; }

  @keyframes blobFloat {
    0%,100% { transform: translate(0,0) scale(1); }
    33%     { transform: translate(20px,-20px) scale(1.05); }
    66%     { transform: translate(-15px,15px) scale(0.95); }
  }
  @keyframes blobFloat3 {
    0%,100% { transform: translate(-50%,-50%) scale(1); }
    33%     { transform: translate(-45%,-55%) scale(1.08); }
    66%     { transform: translate(-55%,-45%) scale(0.92); }
  }
  @keyframes ringPulse {
    0%,100% { opacity: 0.4; transform: scale(1); }
    50%     { opacity: 1;   transform: scale(1.04); }
  }
  @keyframes orbitSpin { to { transform: rotate(360deg); } }
  @keyframes logoFloat {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-8px); }
  }
  @keyframes hexSpin  { to { transform: rotate(360deg); } }
  @keyframes pulseDot {
    0%,100% { opacity: 1;   r: 6; }
    50%     { opacity: 0.5; r: 7; }
  }
`;

const FEATURES = [
  { icon: "⚡", label: "Respon instan" },
  { icon: "🔐", label: "Keamanan end-to-end" },
  { icon: "📊", label: "Dashboard terintegrasi" },
];

export function LoginAnimatedPanel() {
  return (
    <>
      <style>{css}</style>

      <div className="relative hidden lg:flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1e]">
        {/* Blobs */}
        <div className="blob-1 absolute size-80 rounded-full bg-[radial-gradient(circle,#4f46e5,#7c3aed)] -top-16 -left-16 blur-[80px] opacity-35 pointer-events-none" />
        <div className="blob-2 absolute size-64 rounded-full bg-[radial-gradient(circle,#0ea5e9,#6366f1)] -bottom-10 -right-10 blur-[80px] opacity-35 pointer-events-none" />
        <div className="blob-3 absolute size-48 rounded-full bg-[radial-gradient(circle,#a78bfa,#ec4899)] top-1/2 left-1/2 blur-[80px] opacity-35 pointer-events-none" />

        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#a5b4fc" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Rings */}
        <div className="ring-pulse   absolute size-40      rounded-full border border-indigo-300/20      pointer-events-none" />
        <div className="ring-pulse-2 absolute size-[280px] rounded-full border border-indigo-300/10      pointer-events-none" />
        <div className="ring-pulse-3 absolute size-[420px] rounded-full border border-indigo-300/[0.06] pointer-events-none" />

        {/* Orbiting dots */}
        <div className="orbit-sm absolute size-40 rounded-full pointer-events-none">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]" />
        </div>
        <div className="orbit-md absolute size-[280px] rounded-full pointer-events-none">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
        </div>
        <div className="orbit-lg absolute size-[420px] rounded-full pointer-events-none">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center px-10">
          <div className="logo-float">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <polygon className="hex-spin"         points="28,4 52,18 52,38 28,52 4,38 4,18"    stroke="#818cf8" strokeWidth="1.5" fill="none" />
              <polygon className="hex-spin-reverse" points="28,12 44,21 44,35 28,44 12,35 12,21" stroke="#6366f1" strokeWidth="1"   fill="rgba(99,102,241,0.12)" />
              <circle  className="pulse-dot" cx="28" cy="28" r="6" fill="#818cf8" />
            </svg>
          </div>

          <div>
            <h2 className="font-sora text-3xl font-bold text-white tracking-tight">
              Selamat Datang
            </h2>
            <p className="font-dm mt-2 text-sm text-indigo-300/80 leading-relaxed max-w-xs">
              Platform produktivitas yang dirancang untuk membantumu bergerak lebih cepat dan lebih cerdas.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            {FEATURES.map((f) => (
              <div key={f.label} className="font-dm flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-indigo-300/15 backdrop-blur-sm">
                <span className="text-base">{f.icon}</span>
                <span className="text-xs text-indigo-200/90 font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}