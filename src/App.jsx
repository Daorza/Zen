import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useEffect, useState } from "react";

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-bg-primary text-fg-primary transition-colors duration-300">
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-border-default">
        <h1 className="text-2xl font-bold">Tailwind 4 Design System Showcase</h1>
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 rounded-lg bg-btn-default hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled text-white transition"
        >
          {dark ? "Switch to Light" : "Switch to Dark"}
        </button>
      </header>

      <main className="p-8 space-y-12">

        {/* 🎨 Color Palette */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
          <div className="flex gap-6 flex-wrap">
            <ColorSwatch name="primary-900" className="bg-primary-900" />
            <ColorSwatch name="primary-600" className="bg-primary-600" />
            <ColorSwatch name="accent-400" className="bg-accent-400" />
            <ColorSwatch name="neutral-100" className="bg-neutral-100" />
          </div>
        </section>

        {/* 🧱 Card Component */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Card Component</h2>

          <div className="max-w-sm rounded-xl shadow-lg bg-bg-secondary border border-border-default">
            <div className="px-6 py-4">
              <h3 className="font-bold text-lg text-fg-primary mb-2">
                Project Task
              </h3>
              <p className="text-fg-secondary">
                This card uses background, foreground, and border tokens.
              </p>
            </div>
            <div className="px-6 pb-4 flex gap-2 flex-wrap">
              <Tag>#work</Tag>
              <Tag>#frontend</Tag>
              <Tag>#design</Tag>
            </div>
          </div>
        </section>

        {/* 🔘 Button States */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Button States</h2>

          <div className="flex gap-4 flex-wrap">
            <button className="px-4 py-2 rounded-lg bg-btn-default hover:bg-btn-hover active:bg-btn-active text-white transition">
              Default
            </button>

            <button
              disabled
              className="px-4 py-2 rounded-lg bg-btn-disabled text-white cursor-not-allowed"
            >
              Disabled
            </button>
          </div>
        </section>

        {/* 🏷 Task Priority */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Task Priority</h2>

          <div className="flex gap-4 flex-wrap">
            <PriorityBadge color="bg-high-priority">High</PriorityBadge>
            <PriorityBadge color="bg-medium-priority">Medium</PriorityBadge>
            <PriorityBadge color="bg-low-priority">Low</PriorityBadge>
          </div>
        </section>

      </main>
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
