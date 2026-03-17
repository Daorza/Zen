import { LucideLink } from "lucide-react";

export const DashboardTimelineEvent = ({ schedule, statusData, priorityData, isLast }) => {
    return (
        <div className="grid grid-cols-[12px_1fr] gap-3">
            {/* Line + Dot */}
            <div className="relative flex justify-center pt-2">
                {!isLast && (
                    <span className="absolute top-4 bottom-[-16px] w-px bg-slate-200 dark:bg-white/10" />
                )}
                <span
                    className={`h-2.5 w-2.5 rounded-full z-10 ${statusData?.color || "bg-slate-400"}`}
                    title={statusData?.label}
                />
            </div>

            {/* Event Card */}
            <div className={`rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-3 space-y-1.5 w-full ${!isLast ? "mb-4" : ""}`}>
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-slate-800 dark:text-white leading-snug text-[13px] truncate">
                        {schedule.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0 mt-0.5">
                        {schedule.startTime}
                        {schedule.endTime && <> &mdash; {schedule.endTime}</>}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className={`px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider border ${statusData?.badge || "text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-300 dark:bg-slate-400/10 dark:border-white/5"}`}>
                        {statusData?.label || "Unknown"}
                    </span>
                    {priorityData && (
                        <>
                            <span className="size-0.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                            <span className={`px-1.5 py-0.5 rounded-md font-medium border ${priorityData.className}`}>
                                {priorityData.label}
                            </span>
                        </>
                    )}
                </div>

                {schedule.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {schedule.description}
                    </p>
                )}

                {schedule.linkUrl && (
                    <a
                        href={schedule.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 mt-1.5"
                    >
                        <LucideLink className="w-3 h-3" />
                        <span className="truncate">{schedule.linkUrl}</span>
                    </a>
                )}
            </div>
        </div>
    );
};