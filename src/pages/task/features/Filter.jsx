import { motion } from "motion/react";
const PRIORITY_COLORS = {
    High: "text-red-500 dark:text-red-400 bg-red-500/10 border-red-400/20",
    Medium: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-400/20",
    Low: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-400/20",
    All: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-400/20",
};
export const FILTER_OPTIONS = {
    priority: {
        label: "Priority",
        options: ["All", "High", "Medium", "Low"],
    },
    status: {
        label: "Status",
        options: ["All", "Pending", "Done"],
    },
    time: {
        label: "Waktu",
        options: ["Semua", "Hari ini", "7 Hari", "1 Bulan", "3 Bulan"],
    },
};
function FilterChip({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all duration-150 cursor-pointer
                ${active
                    ? PRIORITY_COLORS[label] ?? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-400/20"
                    : "dark:text-white/40 text-gray-500 border-transparent hover:dark:bg-white/5 hover:bg-gray-100"
                }`}
        >
            {label}
        </button>
    );
}

export function FilterDropdown({ filters, onChange, onReset }) {
    const hasActive = Object.entries(filters).some(([key, val]) => {
        const first = FILTER_OPTIONS[key].options[0];
        return val !== first;
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-72
                dark:bg-gray-900 bg-white
                border dark:border-white/10 border-indigo-100
                rounded-2xl shadow-xl dark:shadow-black/40 shadow-indigo-100/60
                p-4 flex flex-col gap-4"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-widest dark:text-white/40 text-gray-400">
                    Filter
                </p>
                {hasActive && (
                    <button
                        onClick={onReset}
                        className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Groups */}
            {Object.entries(FILTER_OPTIONS).map(([key, { label, options }]) => (
                <div key={key} className="flex flex-col gap-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider dark:text-white/30 text-gray-400">
                        {label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {options.map((opt) => (
                            <FilterChip
                                key={opt}
                                label={opt}
                                active={filters[key] === opt}
                                onClick={() => onChange(key, opt)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </motion.div>
    );
}