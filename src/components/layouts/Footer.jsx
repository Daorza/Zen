import React from 'react'
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-indigo-100 dark:border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="font-display font-black text-slate-900 dark:text-white text-xs">Genzen</span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} Genzen. Designed for Zen - Generation.
        </p>
      </div>
    </footer>
  );
}
