import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useEffect, useState } from "react";
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className=" bg-mist-200 dark:bg-indigo-950 text-mist-950 dark:text-mist-50 transition-colors duration-300">
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center border border-indigo-900">
        <h1 className="text-2xl font-bold">Tailwind 4 Design System Showcase</h1>
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
            >
              {theme === "dark" ? "🌙 Dark" : "☀ Light"}
          </button>
      </header>

    </div>
  );
}

/* =====================
   Small Components
===================== */

function ColorSwatch({ name, className }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-16 h-16 rounded-xl shadow ${className}`} />
      <span className="text-sm text-fg-secondary">{name}</span>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="bg-brand-primary text-white px-3 py-1 rounded-full text-sm">
      {children}
    </span>
  );
}

function PriorityBadge({ children, color }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${color}`}
    >
      {children}
    </span>
  );
}
