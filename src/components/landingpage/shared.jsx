import React from "react";
import { MessageSquareText, Sparkles, CalendarCheck, BrainCircuit, Layers, Clock, Zap } from "lucide-react";

export const PAIN_POINTS = [
  "Rencana yang cuma ada di kepala, tapi tidak pernah kesampaian.",
  "Pindah-pindah aplikasi sampai lupa mau ngapain.",
  "Nulis jadwal manual yang habiskan waktu lebih banyak dari kerjanya.",
];

export const HOW_IT_WORKS = [
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
    desc: "GenZen AI memisahkan, menyusun, dan mendeteksi konflik jadwal secara otomatis — dalam hitungan detik.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Konfirmasi, tenang",
    desc: "Tinggal tekan simpan. Pikiran beres, jadwal rapi. Otak kamu bebas buat hal yang lebih penting.",
  },
];

export const FEATURES = [
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

export function GradientText({ children, className = "" }) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-500 via-indigo-400 to-cyan-400 dark:from-cyan-400 dark:via-indigo-400 dark:to-pink-400 ${className}`}
    >
      {children}
    </span>
  );
}

export function GlassPanel({ children, className = "", ...props }) {
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
