import { LucideLink } from "lucide-react";
import { getStatusData, StatusBadge, PriorityBadge, getPriorityData } from "../ui/Badge";

export const DashboardTimelineEvent = ({ schedule, isLast }) => {
    const status = getStatusData(schedule.status);
    const priority = getPriorityData(schedule.priority);

    return (
        <div className="grid grid-cols-[8px_1fr] gap-2.5">
            {/* Line + Dot */}
            <div className="relative flex justify-center pt-1.5">
                {!isLast && (
                    <span className="absolute top-3 -bottom-3 w-px bg-slate-200 dark:bg-white/10" />
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
                    <StatusBadge status={schedule.status} />
                    {schedule.priority && (
                        <>
                            <span className="size-0.5 rounded-full bg-slate-400 dark:bg-slate-600 mx-0.5" />
                            <PriorityBadge priority={schedule.priority} />
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