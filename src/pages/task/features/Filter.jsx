import { motion } from "motion/react";
const PRIORITY_COLORS = {
    High: "text-red-600 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-500/10 dark:border-red-400/20",
    Medium: "text-amber-600 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-400/20",
    Low: "text-emerald-600 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-400/20",
    All: "text-indigo-600 bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-400/20",
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
                    ? PRIORITY_COLORS[label] ?? "text-indigo-600 bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-400/20"
                    : "text-slate-600 border-transparent hover:bg-slate-100 dark:text-white/40 dark:hover:bg-white/5"
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
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-white/10
                rounded-xl shadow-xl shadow-black/5 dark:shadow-black/40
                p-4 flex flex-col gap-4"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-white/40">
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
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/30">
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