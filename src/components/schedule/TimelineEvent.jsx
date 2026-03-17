const statuses = {
  pending: {
    label: "Pending",
    color: "bg-amber-400",
    badge: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  in_progress: {
    label: "In Progress",
    color: "bg-indigo-400",
    badge: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  },
  done: {
    label: "Done",
    color: "bg-emerald-400",
    badge: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
};
import { LinkIcon } from "@heroicons/react/24/outline";

const priorities = {
  low: {
    label: "Low",
    className: "text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-400 dark:bg-slate-400/10",
  },
  medium: {
    label: "Medium",
    className: "text-amber-600 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-400/10",
  },
  high: {
    label: "High",
    className: "text-red-600 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-400/10",
  },
};

export function TimelineEvent({ time, title, duration, status, priority, linkUrl, isLast, onClick }) {

  const statusData = statuses[status] ?? {
    label: status,
    color: "bg-slate-400",
  };

  const priorityData = priorities[priority] ?? null;

  return (
    <div className="grid grid-cols-[70px_20px_1fr] gap-4">

      <div className="text-sm text-slate-500 dark:text-slate-400 text-right pt-1">
        {time}
      </div>

      {/* LINE + DOT */}
      <div className="relative flex justify-center">
        {!isLast && (
          <span className="absolute top-3 bottom-0 w-px bg-slate-200 dark:bg-white/10" />
        )}

        <span className={`h-3 w-3 rounded-full bg-indigo-500 z-10 mt-1 ${statusData.color}`} />
      </div>

      {/* EVENT CARD */}
      <button 
        type="button"
        onClick={onClick}
        className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 space-y-2 text-left hover:bg-slate-100 dark:hover:bg-white/10 transition-colors w-full cursor-pointer overflow-hidden relative group"
      >
        <h3 className="font-semibold text-slate-800 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>
            {duration}
          </span>

          <span className="size-1 rounded-full bg-slate-400 dark:bg-slate-600" />

          <span className={`px-2 py-0.5 rounded-md lg:rounded-lg font-bold text-[10px] uppercase tracking-wider border ${statusData.badge || 'text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-300 dark:bg-slate-400/10 dark:border-white/5'}`}>
            {statusData.label}
          </span>

          {priorityData && (
            <>
              <span className="size-1 rounded-full bg-slate-400 dark:bg-slate-600" />
              <span className={`px-2 py-1 rounded-md font-medium text-xs border ${priorityData.className}`}>
                {priorityData.label}
              </span>
            </>
          )}
        </div>

        {linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg transition-colors border border-indigo-500/20 mt-2 w-max"
          >
            <LinkIcon className="size-3.5" />
            Buka Tautan
          </a>
        )}
      </button>

    </div>
  );
}