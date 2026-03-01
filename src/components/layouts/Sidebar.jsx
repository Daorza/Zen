import { MoonIcon, SunDimIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { LayoutDashboard, CheckSquare, Calendar, StickyNote } from "lucide-react";

const MENU_ITEMS = [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Tasks",     icon: CheckSquare,     path: "/task" },
      { label: "Schedule",  icon: Calendar,        path: "/schedule" },
      { label: "Notes",     icon: StickyNote,      path: "/notes" },
    ];

const SideBar = () => {
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const isDark = theme === "dark";

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div
      className={`
        relative h-full flex flex-col gap-12 transition-all duration-300 ease-in-out
        dark:bg-gray-900 bg-indigo-50 border-r border-indigo-100 dark:border-slate-800 shadow shadow-indigo-50 dark:shadow-slate-800
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-8 z-10 w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-md hover:bg-indigo-600 transition-colors duration-200"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className="mx-auto mt-6 overflow-hidden">
        <h1 className="bg-linear-60 from-blue-500 to-indigo-500 bg-clip-text font-extrabold text-3xl text-transparent whitespace-nowrap">
            {
                collapsed
                ?"G"
                :"Genzen"
            }
        </h1>
      </div>
      <div className="flex flex-col justify-between h-full">
        {/* Navigation */}
        <nav className="flex flex-col gap-2 relative">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group mx-2
                ${collapsed ? "justify-center" : ""}
                ${isActive
                  ? "dark:bg-indigo-500/10 dark:text-indigo-400 border dark:border-indigo-500/20 dark:shadow-[0_0_20px_rgba(99,102,241,0.1)] border-indigo-300 bg-indigo-500/10 text-indigo-500"
                  : "dark:text-white/40 dark:hover:text-white/80 dark:hover:bg-white/5 text-gray-500 border border-transparent hover:bg-indigo-400/10"
                }
              `}
            >
              <item.icon size={22} className="shrink-0 transition-transform group-hover:scale-110" />
              {!collapsed && (
                <span className="font-bold text-xs tracking-wide uppercase whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-t-2 border-indigo-900/10">
          {/* Theme Toggle */}
          <div
            className="mx-2 rounded-2xl flex justify-between items-center mb-2 mt-4 p-4 bg-indigo-400/10 cursor-pointer"
            onClick={handleThemeToggle}
          >
            <div className={`flex items-center gap-2 font-medium dark:text-indigo-400 text-indigo-600 ${collapsed ? "mx-auto" : ""}`}>
              {isDark ? <MoonIcon size={18} /> : <SunDimIcon size={18} />}
              {!collapsed && (isDark ? "Dark" : "Light")}
            </div>
            {!collapsed && (
              <div className="relative inline-block w-11 h-5">
                <input
                  id="switch-component"
                  type="checkbox"
                  checked={isDark}
                  onChange={handleThemeToggle}
                  onClick={(e) => e.stopPropagation()}
                  className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-indigo-400 cursor-pointer transition-colors duration-300"
                />
                <label
                  htmlFor="switch-component"
                  className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-indigo-400 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>

          {/* Profile */}
          <div className={`p-2 rounded-2xl dark:bg-white/5 border dark:border-white/10 bg-indigo-800/10 border-indigo-400 flex items-center gap-4 mx-2 mb-4 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-blue-500 shrink-0 flex items-center justify-center text-white font-black text-sm">
              N
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold dark:text-white text-gray-900 truncate uppercase">Nugroho</p>
                <p className="text-[10px] font-medium dark:text-white/30 text-gray-900/30 truncate">Nuganuca17</p>
              </div>
            )}
          </div>

          {/* Logout Button (commented out) */}
          {/* <button
            onClick={logout}
            className="flex items-center gap-3 mx-2 px-4 py-3 rounded-2xl dark:text-white/30 text-gray-900/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group ring-1 ring-transparent hover:ring-red-500/20 cursor-pointer"
          >
            <LogOut size={18} className="shrink-0 transition-transform group-hover:-translate-x-1" />
            <span className="font-bold text-xs tracking-widest uppercase">Logout</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;