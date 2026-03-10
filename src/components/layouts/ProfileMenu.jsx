import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { LogOut, Settings } from "lucide-react";

const MenuButton = ({ icon: Icon, label, onClick, danger = false, collapsed }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer text-xs font-semibold transition-all duration-150
            ${danger
                ? "dark:text-red-400 text-red-500 dark:hover:bg-red-500/10 hover:bg-red-500/10"
                : "dark:text-white/70 text-gray-700 dark:hover:bg-white/10 hover:bg-indigo-800/10"
            }
            ${collapsed ? 'justify-center' : 'justify-start'}
            `}
    >
        <Icon size={18} strokeWidth={2.5} />
        {!collapsed && label}
    </button>
);

const PopupMenu = ({ className, collapsed, data, onLogout, onSettings }) => {
    return (
        <div className={`${className} mb-2 rounded-md`}>
            <div className="h-full flex flex-col p-1.5 dark:bg-white/5 border dark:border-white/10 bg-indigo-800/10 rounded-md border-indigo-400">

                <div className={`flex items-center gap-4 pb-1.5 mb-1.5 border-b dark:border-white/10 border-indigo-400/30 ${collapsed ? "justify-center" : "justify-between"}`}>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-md bg-linear-to-tr from-indigo-500 to-blue-500 shrink-0 flex items-center justify-center text-white font-black text-sm">
                            {data.name.slice(0, 1)}
                        </div>
                        {!collapsed && (
                            <div className="min-w-0">
                                <p className="text-xs font-bold dark:text-white text-gray-900 truncate uppercase">{data.name}</p>
                                <p className="text-[10px] dark:text-white/50 text-gray-500 truncate w-full break-all">{data.email}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-0.5">
                    <MenuButton icon={Settings} label="Settings" onClick={onSettings} collapsed={collapsed} />
                    <MenuButton icon={LogOut} label="Logout" onClick={onLogout} danger collapsed={collapsed} />
                </div>

            </div>
        </div>
    );
};

const ProfileMenu = ({ className, data, collapsed, onLogout, onSettings, ...props }) => {
    return (
        <div className="relative group flex-col gap-4 mx-2 mb-4">
            <PopupMenu
                className="overflow-hidden group-hover:h-36 w-full transition-all duration-300 ease-in-out h-0"
                collapsed={collapsed}
                data={data}
                onLogout={onLogout}
                onSettings={onSettings}
            />
            <div
                {...props}
                className={`p-1.5 rounded-md dark:bg-white/5 dark:hover:bg-white/15 border dark:border-white/10 bg-indigo-800/10 hover:bg-indigo-800/15 transition-all duration-150 cursor-pointer border-indigo-400 flex items-center gap-4 ${collapsed ? "justify-center" : "justify-between"}`}
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-blue-500 shrink-0 flex items-center justify-center text-white font-black text-sm">
                        {data.name.slice(0, 1)}
                    </div>
                    {!collapsed && (
                        <div className="min-w-0">
                            <p className="text-xs font-bold dark:text-white text-gray-900 truncate uppercase">{data.name}</p>
                        </div>
                    )}
                </div>
                {!collapsed && (
                    <button className="w-5 h-5 group-hover:rotate-180 group-hover:scale-110 transition-all duration-300">
                        <ChevronUpDownIcon />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfileMenu;