import { LucideLink } from "lucide-react";

const statusData = {
    pending: {
        label: "Pending",
        color: "bg-amber-400",
        badge: "text-amber-600 bg-amber-400/10 border-amber-400/20 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20",
    },
    done: {
        label: "Done",
        color: "bg-emerald-400",
        badge: "text-emerald-600 bg-emerald-400/10 border-emerald-400/20 dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20",
    },
    skipped: {
        label: "Skipped",
        color: "bg-slate-400",
        badge: "text-slate-500 bg-slate-400/10 border-slate-400/20 dark:text-slate-400 dark:bg-slate-400/10 dark:border-white/10",
    },
};

const priorityData = {
    low: {
        label: "Low",
        className: "text-slate-500 bg-slate-400/10 border-slate-300 dark:text-slate-400 dark:border-white/10",
    },
    medium: {
        label: "Medium",
        className: "text-amber-600 bg-amber-400/10 border-amber-300 dark:text-amber-400 dark:border-amber-400/20",
    },
    high: {
        label: "High",
        className: "text-red-600 bg-red-400/10 border-red-300 dark:text-red-400 dark:border-red-400/20",
    },
};

export const DashboardTimelineEvent = ({ schedule, isLast }) => {
    const status = statusData[schedule.status] ?? statusData.pending;
    const priority = priorityData[schedule.priority] ?? null;

    return (
        <div className="grid grid-cols-[8px_1fr] gap-2.5">
            {/* Line + Dot */}
            <div className="relative flex justify-center pt-1.5">
                {!isLast && (
                    <span className="absolute top-3 bottom-[-12px] w-px bg-slate-200 dark:bg-white/10" />
                )}
                <span
                    className={`h-2 w-2 rounded-full z-10 shrink-0 ${status.color}`}
                    title={status.label}
                />
            </div>

            {/* Event Card */}
            <div className={`rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3 py-2 space-y-2 w-full ${!isLast ? "mb-3" : ""}`}>
                <div className="flex justify-between items-center gap-2">
                    <h3 className="font-semibold text-slate-800 dark:text-white text-xs truncate">
                        {schedule.title}
                    </h3>
                </div>

                <div className="text-[10px] font-mono text-slate-400 shrink-0">
                    {schedule.startTime}
                    {schedule.endTime && <> &mdash; {schedule.endTime}</>}
                </div>

                <div className="flex flex-wrap items-center gap-1 text-[10px]">
                    <span className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border ${status.badge}`}>
                        {status.label}
                    </span>
                    {priority && (
                        <>
                            <span className="size-0.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                            <span className={`px-1.5 py-0.5 rounded font-medium border ${priority.className}`}>
                                {priority.label}
                            </span>
                        </>
                    )}
                </div>

                {schedule.description && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed">
                        {schedule.description}
                    </p>
                )}

                {schedule.linkUrl && (
                    <a
                        href={schedule.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300"
                    >
                        <LucideLink className="w-2.5 h-2.5" />
                        <span className="truncate">{schedule.linkUrl}</span>
                    </a>
                )}
            </div>
        </div>
    );
};