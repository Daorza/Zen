import { LinkIcon } from "@heroicons/react/24/outline";
import { getStatusData, StatusBadge, PriorityBadge } from "../ui/Badge";

export function TimelineEvent({
  time,
  title,
  duration,
  status,
  priority,
  linkUrl,
  isLast,
  onClick,
}) {
  const statusData = getStatusData(status);

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

        <span
          className={`h-3 w-3 rounded-full bg-indigo-500 z-10 mt-1 ${statusData.color}`}
        />
      </div>

      {/* EVENT CARD */}
      <button
        type="button"
        onClick={onClick}
        className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 space-y-2 text-left hover:bg-slate-100 dark:hover:bg-white/10 transition-colors w-full cursor-pointer overflow-hidden relative group"
      >
        <h3 className="capitalize font-semibold text-slate-800 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{duration}</span>

          <span className="size-1 rounded-full bg-slate-400 dark:bg-slate-600" />

          <StatusBadge status={status} />

          {priority && (
            <>
              <span className="size-1 rounded-full bg-slate-400 dark:bg-slate-600" />
              <PriorityBadge priority={priority} />
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
