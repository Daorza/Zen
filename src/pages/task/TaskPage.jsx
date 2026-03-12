import { LucidePlus, Search, SlidersHorizontal, X } from "lucide-react";
import { MagicButton } from "../../components/ui/MagicButton";
import GlassCard from "../../components/ui/GlassCard";
import ProgressBar from "../../components/ui/Progressbar";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import MainTaskSection from "./features/MainTaskSection";
import { FilterDropdown, FILTER_OPTIONS } from "./features/Filter";
import TaskHeader from "./features/TaskHeader";
import TaskProgress from "./features/TaskProgress";
import { useTodos } from "../../hooks/useTodos";

export default function TaskPage() {
    const {
        todos,
        filteredTodos,
        isFiltering,
        loading,
        error,
        filters,
        setFilters,
        toggleTodo,
        deleteTodo,
        search,
        setSearch,
    } = useTodos();

    const [filterOpen, setFilterOpen] = useState(false);
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

    const resetFilters = () => {
        setFilters({ priority: "All", status: "All", time: "Semua" });
        setSearch("");
    };

    const activeFilterCount = Object.entries(filters).filter(([key, val]) => {
        return val !== FILTER_OPTIONS[key].options[0];
    }).length;

    return (
        <div className="sm:p-8 p-4 pb-28 md:pb-8 flex flex-col gap-4">
            {/* Header */}
            <TaskHeader />

            {/* Progress card — pakai todos (data asli, tidak terpengaruh filter) */}
            <TaskProgress todos={todos} />

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

            <AnimatePresence>
                {isFiltering && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center justify-between text-xs text-slate-500 dark:text-white/40 px-1"
                    >
                        <span>
                            Menampilkan{" "}
                            <span className="font-semibold text-indigo-500">
                                {filteredTodos.length}
                            </span>{" "}
                            dari {todos.length} tugas
                        </span>
                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-1 text-indigo-500 hover:text-indigo-400 font-semibold transition-colors cursor-pointer"
                        >
                            <X size={12} />
                            Reset filter
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading ? (
                <GlassCard className="w-full h-20" skeleton />
            ) : error ? (
                <div className="flex justify-center py-12 text-red-500 text-sm">
                    Gagal memuat tugas.
                </div>
            ) : (
                <MainTaskSection
                    tasks={filteredTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    isFiltering={isFiltering}
                />
            )}
        </div>
    );
}