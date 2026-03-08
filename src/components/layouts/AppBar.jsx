import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Lock, Palette, LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PROFILE_DATA = {
    name: "Nugroho Nur Cahyo",
    email: "Nuganuca17@gmail.com",
};

const MENU_ITEMS = [
    { label: "Profile", icon: User, to: "/profile" },
    { label: "New Password", icon: Lock, to: "/new-password" },
    { label: "Appearance", icon: Palette, to: "/appearance" },
];

const ProfileDrawer = ({ open, onClose, onLogout }) => {
    const navigate = useNavigate();
    const overlayRef = useRef(null);

    // Close on outside click
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    // Lock scroll when open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        ref={overlayRef}
                        onClick={handleOverlayClick}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl
                            dark:bg-gray-900 bg-indigo-50
                            border-t border-indigo-100 dark:border-slate-800
                            shadow-xl"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    >
                        {/* Drag handle */}
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full dark:bg-white/20 bg-gray-300" />
                        </div>

                        <div className="p-4 flex flex-col gap-4">
                            {/* User info */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-linear-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                                        {PROFILE_DATA.name.slice(0, 1)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold dark:text-white text-gray-900 uppercase">
                                            {PROFILE_DATA.name}
                                        </p>
                                        <p className="text-xs dark:text-white/40 text-gray-500">
                                            {PROFILE_DATA.email}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full dark:bg-white/10 bg-gray-200 flex items-center justify-center dark:text-white/50 text-gray-500 cursor-pointer"
                                >
                                    <X size={15} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="h-px dark:bg-white/10 bg-indigo-200" />

                            {/* Menu items */}
                            <div className="flex flex-col gap-1">
                                {MENU_ITEMS.map(({ label, icon: Icon, to }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer
                                            ${isActive
                                                ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 dark:bg-indigo-200/15"
                                                : "text-gray-600 dark:text-white/50 hover:bg-gray-500/10 dark:hover:bg-white/5"
                                            }`
                                        }
                                    >
                                        <Icon size={16} strokeWidth={2.5} />
                                        {label}
                                    </NavLink>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-px dark:bg-white/10 bg-indigo-200" />

                            {/* Logout */}
                            <button
                                onClick={() => { onLogout?.(); onClose(); }}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium
                                    text-red-500 dark:text-red-400
                                    hover:bg-red-500/10 transition-all duration-150 cursor-pointer w-full"
                            >
                                <LogOut size={16} strokeWidth={2.5} />
                                Logout
                            </button>

                            {/* Safe area bottom spacing */}
                            <div className="pb-2" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const AppBar = ({ onLogout }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <header className="md:hidden fixed top-0 left-0 right-0 z-30
                h-14 px-4 flex items-center justify-between
                dark:bg-gray-900/80 bg-indigo-50/80
                backdrop-blur-xl
                border-b border-indigo-100 dark:border-slate-800"
            >
                {/* Logo */}
                <h1 className="bg-linear-60 from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text font-extrabold text-2xl text-transparent">
                    Genzen
                </h1>

                {/* Profile avatar button */}
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="w-9 h-9 rounded-full bg-linear-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white font-black text-sm cursor-pointer shrink-0"
                >
                    {PROFILE_DATA.name.slice(0, 1)}
                </button>
            </header>

            <ProfileDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onLogout={onLogout}
            />
        </>
    );
};

export default AppBar;