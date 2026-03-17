import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Pin, Trash2 } from "lucide-react";

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

export function NotesCard({ title, description, date, category, color, isPinned, onClick, onTogglePin, onDelete, small = false }) {
  const handlePin = (e) => {
    e.stopPropagation();
    onTogglePin?.();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.();
  };

  // ── Small variant ─────────────────────────────────────────────
  if (small) {
    return (
      <div
        onClick={onClick}
        className="group relative w-full flex flex-col rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5
                   overflow-hidden transition-all duration-300 cursor-pointer
                   hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:-translate-y-0.5
                   hover:shadow-lg hover:shadow-black/20"
      >
        {/* Color accent bar */}
        {color && (
          <div className="h-0.5 w-full shrink-0" style={{ backgroundColor: color }} />
        )}

        <div className="flex flex-col flex-1 gap-2 p-3 w-full">

          {/* Top row: title + action buttons */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white leading-snug line-clamp-2 flex-1 min-w-0">
              {title}
            </h2>

            {/* <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={handlePin}
                title={isPinned ? "Unpin" : "Pin"}
                className={`p-1 rounded-md transition-all duration-200 cursor-pointer
                  ${isPinned
                    ? "text-indigo-400 bg-indigo-500/15 hover:bg-indigo-500/25"
                    : "text-slate-600 hover:text-indigo-400 hover:bg-indigo-500/10 opacity-0 group-hover:opacity-100"
                  }`}
              >
                <Pin size={11} className={isPinned ? "fill-indigo-400" : ""} />
              </button>

              <button
                onClick={handleDelete}
                title="Hapus catatan"
                className="p-1 rounded-md transition-all duration-200 cursor-pointer
                           text-slate-600 hover:text-red-400 hover:bg-red-500/10
                           opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={11} />
              </button>
            </div> */}
          </div>

          {/* Description */}
          {description && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
              {description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 mt-auto pt-1.5 border-t border-slate-200 dark:border-white/5">
            {date ? (
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <CalendarDaysIcon className="size-3 shrink-0" />
                <time dateTime={date}>{formatDate(date)}</time>
              </div>
            ) : (
              <span />
            )}

            {category && (
              <span className="inline-flex items-center rounded-full bg-indigo-500/15 border border-indigo-500/20
                               px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-400">
                {category}
              </span>
            )}
          </div>

        </div>

        {/* Hover gradient overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300
                        group-hover:opacity-100 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
      </div>
    );
  }

  // ── Default variant ───────────────────────────────────────────
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5
                 overflow-hidden transition-all duration-300 cursor-pointer
                 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:-translate-y-0.5
                 hover:shadow-lg hover:shadow-black/20"
    >
      {/* Color accent bar */}
      {color && (
        <div className="h-1 w-full shrink-0" style={{ backgroundColor: color }} />
      )}

      <div className="flex flex-col flex-1 gap-3 p-5">

        {/* Top row: title + action buttons */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-snug line-clamp-2 flex-1 min-w-0">
            {title}
          </h2>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handlePin}
              title={isPinned ? "Unpin" : "Pin"}
              className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer
                ${isPinned
                  ? "text-indigo-400 bg-indigo-500/15 hover:bg-indigo-500/25"
                  : "text-slate-600 hover:text-indigo-400 hover:bg-indigo-500/10 opacity-0 group-hover:opacity-100"
                }`}
            >
              <Pin size={13} className={isPinned ? "fill-indigo-400" : ""} />
            </button>

            <button
              onClick={handleDelete}
              title="Hapus catatan"
              className="p-1.5 rounded-lg transition-all duration-200 cursor-pointer
                         text-slate-600 hover:text-red-400 hover:bg-red-500/10
                         opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">
            {description}
          </p>
        )}

        {/* Footer: date (kiri) + category (kanan) */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-slate-200 dark:border-white/5">
          {date ? (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <CalendarDaysIcon className="size-3.5 shrink-0" />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
          ) : (
            <span />
          )}

          {category && (
            <span className="inline-flex items-center rounded-full bg-indigo-500/15 border border-indigo-500/20
                             px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              {category}
            </span>
          )}
        </div>

      </div>

      {/* Hover gradient overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300
                      group-hover:opacity-100 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
    </div>
  );
}