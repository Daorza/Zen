const statuses = {
  pending: {
    label: "Pending",
    color: "bg-amber-400",
  },
  progress: {
    label: "In Progress",
    color: "bg-indigo-400",
  },
  done: {
    label: "Done",
    color: "bg-emerald-400",
  },
};

const priorities = {
  low: {
    label: "Low",
    className: "text-slate-400 bg-slate-400/10",
  },
  medium: {
    label: "Medium",
    className: "text-amber-400 bg-amber-400/10",
  },
  high: {
    label: "High",
    className: "text-red-400 bg-red-400/10",
  },
};

export function TimelineEvent({ time, title, duration, status, priority, isLast }) {

  const statusData = statuses[status] ?? {
    label: status,
    color: "bg-slate-400",
  };

  const priorityData = priorities[priority] ?? null;
  
  return (
    <div className="grid grid-cols-[70px_20px_1fr] gap-4">

      <div className="text-sm text-slate-400 text-right pt-1">
        {time}
      </div>

      {/* LINE + DOT */}
      <div className="relative flex justify-center">
        {!isLast && (
          <span className="absolute top-3 bottom-0 w-px bg-white/10" />
        )}

        <span className={`h-3 w-3 rounded-full bg-indigo-500 z-10 mt-1 ${statusData.color}`} />
      </div>

      {/* EVENT CARD */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
        <h3 className="font-semibold text-white leading-snug">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>
            {duration}
          </span>

          <span className="size-1 rounded-full bg-slate-600" />

          <span>
            {statusData.label}
          </span>

          {priorityData && (
            <>
              <span className="size-1 rounded-full bg-slate-600" />
              <span className={`px-2 py-1 rounded-md font-medium text-xs ${priorityData.className}`}>
                {priorityData.label}
              </span>
            </>
          )}
        </div>
      </div>

    </div>
  );
}