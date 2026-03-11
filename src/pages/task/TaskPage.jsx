import { LucidePlus, Search, SlidersHorizontal, X } from "lucide-react";
import { MagicButton } from "../../components/ui/MagicButton";
import GlassCard from "../../components/ui/GlassCard";
import { ProgressBar } from "../../components/ui/Progressbar";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import MainTaskSection from "./features/MainTaskSection";

const FILTER_OPTIONS = {
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
        options: ["Semua", "Hari ini", "7 Hari", "1 Bulan"],
    },
};

const PRIORITY_COLORS = {
    High: "text-red-500 dark:text-red-400 bg-red-500/10 border-red-400/20",
    Medium: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-400/20",
    Low: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-400/20",
    All: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-400/20",
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

function FilterDropdown({ filters, onChange, onReset }) {
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

export default function TaskPage() {
    const [search, setSearch] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        priority: "All",
        status: "All",
        time: "Semua",
    });

    const filterRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }));
    const resetFilters = () => setFilters({ priority: "All", status: "All", time: "Semua" });

    const activeFilterCount = Object.entries(filters).filter(([key, val]) => {
        return val !== FILTER_OPTIONS[key].options[0];
    }).length;

    return (
        <div className="sm:p-8 p-4 pb-28 md:pb-8 flex flex-col gap-4">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold dark:text-white text-gray-900">
                        Tugas
                    </h1>
                    <p className="font-medium text-slate-600 dark:text-white/40">
                        Ingat aktivitas harianmu!
                    </p>
                </div>
                <MagicButton variant="primary">
                    <LucidePlus size={16} />
                    Tambah Tugas
                </MagicButton>
            </div>

            {/* Progress card */}
            <GlassCard className="p-4 rounded-xl!">
                <div className="flex flex-col gap-4">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="text-lg font-bold dark:text-white text-gray-900">
                            Progres hari ini
                        </h2>
                        <p className="font-medium text-slate-600 dark:text-white/40">
                            14/20
                        </p>
                    </div>
                    <ProgressBar current={14} total={20} />
                    <p className="font-medium text-slate-600 dark:text-white/40">
                        Kamu sudah hampir selesai, tetap semangat!
                    </p>
                </div>
            </GlassCard>

            {/* Search + Filter */}
            <div className="flex items-center gap-2 w-full">
                <div className="relative flex-1">
                    <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-white/25 text-gray-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari tugas..."
                        className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm font-medium
                            dark:bg-white/5 bg-white
                            dark:border-white/10 border-gray-200 border
                            dark:text-white text-gray-900
                            dark:placeholder:text-white/25 placeholder:text-gray-400
                            focus:outline-none dark:focus:border-indigo-500/50 focus:border-indigo-400
                            transition-all duration-150"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-white/30 text-gray-400 hover:dark:text-white/60 hover:text-gray-600 cursor-pointer transition-colors"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
                <div className="relative" ref={filterRef}>
                    <button
                        onClick={() => setFilterOpen((v) => !v)}
                        className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 cursor-pointer
                            ${filterOpen || activeFilterCount > 0
                                ? "dark:bg-indigo-500/15 bg-indigo-500/10 dark:border-indigo-500/30 border-indigo-300 text-indigo-600 dark:text-indigo-400"
                                : "dark:bg-white/5 bg-white dark:border-white/10 border-gray-200 dark:text-white/50 text-gray-500 hover:dark:bg-white/10 hover:bg-gray-50"
                            }`}
                    >
                        <SlidersHorizontal size={15} strokeWidth={2.5} />
                        <span className="hidden sm:inline">Filter</span>
                        {activeFilterCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-black flex items-center justify-center">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {filterOpen && (
                            <FilterDropdown
                                filters={filters}
                                onChange={handleFilter}
                                onReset={resetFilters}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {/* main content */}
            <MainTaskSection />
        </div>
    );
}