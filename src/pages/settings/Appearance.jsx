import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../hooks/useTheme"; // sesuaikan path
import { switchTransition } from "../../lib/switchTransition";
const THEMES = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
];

const AppearancePage = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-col gap-5 max-w-lg">
            <div className="flex flex-col gap-1 pb-4 border-b dark:border-white/10 border-gray-200">
                <h2 className="text-base font-bold dark:text-white text-gray-900">Appearance</h2>
                <p className="text-sm dark:text-white/40 text-gray-500">
                    Update the appearance settings for your account
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold dark:text-white/80 text-gray-800">Theme</label>
                <div className="flex p-1 rounded-lg dark:bg-white/5 bg-gray-100 dark:border-white/10 border-gray-200 border w-fit gap-1">
                    {THEMES.map(({ value, label, icon: Icon }) => (
                        <button
                            key={value}
                            onClick={(e) => switchTransition(e, () => setTheme(value))}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
                                ${theme === value
                                    ? "dark:bg-white/15 bg-white dark:text-white text-gray-900 shadow-sm dark:shadow-black/30 shadow-gray-200"
                                    : "dark:text-white/40 text-gray-500 hover:dark:text-white/60 hover:text-gray-700"
                                }`}
                        >
                            <Icon size={14} strokeWidth={2} />
                            {label}
                        </button>
                    ))}
                </div>
                <p className="text-xs dark:text-white/25 text-gray-400 mt-1">
                    {theme === "system"
                        ? "Mengikuti pengaturan tema perangkat kamu secara otomatis"
                        : theme === "dark"
                            ? "Menggunakan tema gelap"
                            : "Menggunakan tema terang"
                    }
                </p>
            </div>
        </div>
    );
};

export default AppearancePage;