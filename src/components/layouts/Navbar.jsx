import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { ThemeSwitch } from "../ui/ThemeSwitch";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const navRef = useRef(null);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      if (navRef.current) {
        if (y > lastY && y > 80) {
          navRef.current.style.transform = "translateY(-100%)";
        } else {
          navRef.current.style.transform = "translateY(0)";
        }
      }
      lastY = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 transition-transform duration-300 w-full px-4 pt-4"
    >
      <div
        className="sm:max-w-5xl sm:mx-auto flex items-center justify-between px-5 py-3 rounded-2xl
      bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg
      border border-indigo-100 dark:border-white/10
      shadow-lg shadow-indigo-100/30 dark:shadow-black/20"
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-700 transition-colors duration-200">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-display font-black text-slate-900 dark:text-white text-sm tracking-tight">
            Genzen
          </span>
        </NavLink>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <button
            onClick={() => navigate("/auth/login")}
            className="px-4 py-2 rounded-xl text-xs font-semibold
                bg-indigo-600 text-white hover:bg-indigo-700
                transition-colors duration-200 hidden sm:block"
          >
            Mulai sekarang
          </button>
        </div>
      </div>
    </header>
  );
}