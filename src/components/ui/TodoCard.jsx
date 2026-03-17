import { LucideCalendar, LucideCheck, LucideClock, Trash2 } from "lucide-react";
import { PriorityBadge } from "./Badge";

function formatDate(dateStr) {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

/**
 * TodoCard — Reusable task card component.
 *
 * Props:
 * @param {object}   task             - Task / Activity object
 * @param {string}   task.id
 * @param {string}   task.title
 * @param {string}   task.date        - 'YYYY-MM-DD'
 * @param {string}   task.status      - 'pending' | 'done' | 'skipped'
 * @param {string}   [task.startTime] - 'HH:MM'
 * @param {string}   [task.endTime]   - 'HH:MM'
 * @param {string}   [task.priority]  - 'low' | 'medium' | 'high'
 * @param {function} [onToggle]       - Called when checkbox clicked
 * @param {function} [onDelete]       - Called when delete button clicked
 * @param {function} [onClick]        - Called when card body clicked
 * @param {boolean}  [small]          - Compact mode: hanya checklist + title
 */
export default function TodoCard({ task, onToggle, onDelete, onClick, small = false }) {
    const done = task.status === "done";
    const priority = task.priority?.toLowerCase();

    const handleToggle = (e) => {
        e.stopPropagation();
        onToggle?.();
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete?.();
    };

    // ── Small variant ──────────────────────────────────────────────
    if (small) {
        return (
            <div
                onClick={() => onClick?.()}
                className="group flex items-center gap-3 px-3 py-2 rounded-xl
                           bg-slate-50 dark:bg-white/5
                           border border-slate-200 dark:border-white/10
                           hover:bg-slate-100 dark:hover:bg-white/10
                           transition-colors duration-200 cursor-pointer w-full"
            >
                {/* Checkbox */}
                <button
                    onClick={handleToggle}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0
                                transition-colors duration-200 cursor-pointer
                                ${done
                            ? "bg-indigo-500 border-indigo-500"
                            : "bg-white dark:bg-transparent border-slate-300 dark:border-white/30 hover:border-indigo-500 dark:hover:border-indigo-400"
                        }`}
                >
                    {done && <LucideCheck size={12} strokeWidth={3} className="text-white" />}
                </button>

                {/* Title only */}
                <p className={`text-sm font-semibold truncate flex-1 min-w-0
                               ${done
                        ? "line-through text-slate-400 dark:text-white/30"
                        : "text-gray-800 dark:text-white/90"
                    }`}
                >
                    {task.title}
                </p>
                {priority && (
                    <div className="hidden sm:block">
                        <PriorityBadge priority={priority} />
                    </div>
                )}
            </div>
        );
    }

    // ── Default variant ────────────────────────────────────────────
    return (
        <div
            onClick={() => onClick?.()}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl
                       bg-slate-50 dark:bg-white/5
                       border border-slate-200 dark:border-white/10
                       hover:bg-slate-100 dark:hover:bg-white/10
                       transition-colors duration-200 cursor-pointer w-full"
        >
            {/* Checkbox */}
            <button
                onClick={handleToggle}
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0
                            transition-colors duration-200 cursor-pointer
                            ${done
                        ? "bg-indigo-500 border-indigo-500"
                        : "bg-white dark:bg-transparent border-slate-300 dark:border-white/30 hover:border-indigo-500 dark:hover:border-indigo-400"
                    }`}
            >
                {done && <LucideCheck size={12} strokeWidth={3} className="text-white" />}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold truncate
                                   ${done
                            ? "line-through text-slate-400 dark:text-white/30"
                            : "text-gray-800 dark:text-white/90"
                        }`}
                    >
                        {task.title}
                    </p>

                    {priority && (
                        <div className="hidden sm:block">
                            <PriorityBadge priority={priority} />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400 dark:text-white/30 font-medium">
                    {task.date && (
                        <span className="flex items-center gap-1">
                            <LucideCalendar size={11} />
                            {formatDate(task.date)}
                        </span>
                    )}
                    {task.startTime && (
                        <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                                <LucideClock size={11} />
                                {task.startTime}
                                {task.endTime && `–${task.endTime}`}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Delete button — visible on hover */}
            <button
                onClick={handleDelete}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                           p-1.5 rounded-lg
                           text-slate-400 dark:text-white/30
                           hover:text-red-500 dark:hover:text-red-400
                           hover:bg-red-500/10
                           cursor-pointer shrink-0"
                aria-label="Hapus tugas"
            >
                <Trash2 size={15} strokeWidth={2} />
            </button>
        </div>
    );
}