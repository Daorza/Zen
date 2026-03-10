import { NavLink, Outlet } from "react-router-dom";
import { User, Lock, Palette } from "lucide-react";

const MENU_ITEMS = [
    { label: "Profile", icon: User, to: "/profile" },
    { label: "Password", icon: Lock, to: "/new-password" },
    { label: "Appearance", icon: Palette, to: "/appearance" },
];

const SettingSidebar = ({ className }) => (
    <aside className={`w-52 flex flex-col gap-1 shrink-0 ${className}`}>
        {MENU_ITEMS.map(({ label, icon: Icon, to }) => (
            <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer
                    ${isActive
                        ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 dark:bg-indigo-200/15"
                        : "text-gray-600 dark:text-white/50 hover:bg-gray-500/10 dark:hover:bg-white/5"
                    }`
                }
            >
                <Icon size={15} strokeWidth={2.5} />
                {label}
            </NavLink>
        ))}
    </aside>
);

const SettingLayout = ({ className, ...props }) => {
    return (
        <div
            {...props}
            className={`w-full h-full overflow-hidden bg-white/5 dark:bg-slate-950/20 backdrop-blur-2xl p-4 sm:p-8 ${className}`}
        >
            <section className="flex flex-col gap-6 h-full">
                <header className=" flex-col gap-1 pb-6 border-b dark:border-white/10 border-gray-200 hidden sm:flex">
                    <h1 className="text-2xl font-semibold dark:text-white text-gray-900">
                        Settings
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-white/40 font-medium">
                        Manage your profile and account settings
                    </p>
                </header>

                <main className="flex gap-8 h-full overflow-hidden">
                    <SettingSidebar className={'sm:flex hidden'} />
                    <section className="flex-1 h-full overflow-y-auto">
                        <Outlet />
                    </section>
                </main>
            </section>
        </div>
    );
};

export default SettingLayout;