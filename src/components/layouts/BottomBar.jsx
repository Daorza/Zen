import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, CheckSquare, Calendar, StickyNote } from "lucide-react";

const MENU_ITEMS = [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Tasks",     icon: CheckSquare,     path: "/task" },
      { label: "Schedule",  icon: Calendar,        path: "/schedule" },
      { label: "Notes",     icon: StickyNote,      path: "/notes" },
    //   tambahin profile page
    ];
const BottomBar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 z-40 h-24 w-full flex items-center justify-center md:hidden px-4 pb-2">
      <div className="flex items-center justify-around w-full h-full rounded-2xl backdrop-blur-2xl bg-white/10 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full group"
            >
              {/* Icon */}
              <span
                className={`
                  relative z-10 transition-all duration-400 ease-out
                  ${isActive
                    ? "-translate-y-1 scale-110 text-indigo-500 dark:text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                    : "translate-y-0 scale-100 text-slate-400 dark:text-white/30 group-hover:text-slate-600 dark:group-hover:text-white/60 group-hover:scale-105"
                  }
                `}
              >
                <item.icon size={22} />
              </span>

              <span
                className={`
                  relative z-10 text-[10px] font-bold tracking-widest uppercase transition-all duration-400 ease-out
                  ${isActive
                    ? "opacity-100 translate-y-0 text-indigo-500 dark:text-indigo-400"
                    : "opacity-40 translate-y-0.5 text-gray-700 dark:text-white/30 group-hover:opacity-70"
                  }
                `}
              >
                {item.label}
              </span>

              <span
                className={`
                  absolute bottom-2.5 w-6 h-px rounded-2xl bg-indigo-400 transition-all duration-500
                  ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                `}
              />
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomBar;