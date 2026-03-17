import {
  MoonIcon,
  SunDimIcon,
  ChevronLeft,
  ChevronRight,
  LucideArrowUpDown,
  ArrowUpDownIcon,
  CircleDollarSignIcon,
  DollarSign,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  StickyNote,
} from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ConfirmModal from "../ui/ConfirmModal";

const MENU_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Schedule", icon: Calendar, path: "/schedule" },
  { label: "Tasks", icon: CheckSquare, path: "/task" },
  { label: "Notes", icon: StickyNote, path: "/notes" },
];
const SideBar = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleAskLogout = () => {
    setConfirmOpen(true);
  };

  const handleLogout = () => {
    // logic logout kamu (hapus token, redirect, dll)
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const PROFILE_DATA = {
    name: user?.name ?? "",
    email: user?.email ?? "",
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
        className="absolute -right-3.5 top-8 z-10 w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-md hover:bg-indigo-600 transition-colors duration-200  cursor-pointer"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className="mx-auto mt-6 overflow-hidden">
          <NavLink
          to="/dashboard"
          className="flex items-center gap-2 group"
        >
        <h1 className="bg-linear-60 from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text font-extrabold text-3xl text-transparent whitespace-nowrap">
          {collapsed ? "G" : "Genzen"}
        </h1>
        </NavLink>
      </div>
      <div className="flex flex-col justify-between h-full mt-8">
        {/* Navigation */}
        <nav className="flex flex-col gap-2 relative">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) => `
                flex items-center gap-4 px-2.5 py-2 rounded-md transition-all duration-300 group mx-2
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive
                    ? "dark:bg-indigo-500/10 dark:text-indigo-400 border dark:border-indigo-500/20 dark:shadow-[0_0_20px_rgba(99,102,241,0.1)] border-indigo-300 bg-indigo-500/10 text-indigo-500"
                    : "dark:text-white/40 dark:hover:text-white/80 dark:hover:bg-white/5 text-gray-500 border border-transparent hover:bg-indigo-400/10"
                }
              `}
            >
              <item.icon
                size={22}
                className="shrink-0 transition-transform group-hover:scale-110"
              />
              {!collapsed && (
                <span className="font-bold text-xs tracking-wide uppercase whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-t-2 border-indigo-900/10">
          <ProfileMenu
            data={PROFILE_DATA}
            collapsed={collapsed}
            onLogout={handleAskLogout}
            onSettings={() => navigate("/profile")}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          handleLogout();
          setConfirmOpen(false);
        }}
        title="Keluar dari akun?"
        description="Kamu perlu login kembali."
        confirmText="Logout"
        variant="danger"
      />
    </div>
  );
};

export default SideBar;
