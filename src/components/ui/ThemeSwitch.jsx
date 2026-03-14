import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../../hooks/useTheme";
import { switchTransition } from "../../lib/switchTransition";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={(e) =>
        switchTransition(e, () => setTheme(isDark ? "light" : "dark"))
      }
      className="relative flex items-center rounded-full w-18 h-8
        bg-slate-200 dark:bg-gray-700 transition-all duration-300 shadow-inner border border-slate-600/20 dark:border-slate-400/40 px-1"
    >
      <div className="absolute flex items-center justify-center size-6 bg-white dark:bg-slate-900 rounded-full shadow-md transition-all duration-300 left-2 dark:left-10">
        {isDark ? (
          <MoonIcon className="size-4 text-indigo-400" />
        ) : (
          <SunIcon className="size-4 text-yellow-400" />
        )}
      </div>
    </button>
  );
}
