import { DashboardTimelineEvent } from "../../../components/dashboard/DashboardTimelineEvent";
import useSWR from "swr";
import api from "../../../services/api";
import GlassCard from "../../../components/ui/GlassCard";
import { Link } from "react-router-dom";

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

export const DashboardSchedules = () => {
    const { data: schedulesResponse, isLoading } = useSWR("/activities?type=schedule", async (url) => {
        const res = await api.get(url);
        return res.data;
    });

    const schedules = schedulesResponse?.data ?? [];

    // Filter for "today"
    const today = new Date().toISOString().split("T")[0];
    const todayFiltered = schedules.filter(s => {
        if (!s.date) return false;
        // Avoid timezone offset bugs by parsing just the prefix
        return new Date(s.date).toISOString().split("T")[0] === today;
    });

    const DATA = todayFiltered.slice(0, 3);
    return (
        <GlassCard skeleton={isLoading} className="flex flex-col p-6 w-full h-full justify-between">
            <div className="w-full flex flex-col gap-4">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Today&apos;s Schedule</h2>
                {isLoading && <p className="text-xs text-slate-500 dark:text-slate-400">Loading schedules...</p>}
                {!isLoading && DATA.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400">No schedules for today.</p>}
                {DATA.map((schedule, i) => {
                    const statusData = statuses[schedule.status] ?? null;
                    const priorityData = priorities[schedule.priority] ?? null;
                    const isLast = i === DATA.length - 1;
                    return (
                        <DashboardTimelineEvent
                            key={schedule.id}
                            schedule={schedule}
                            statusData={statusData}
                            priorityData={priorityData}
                            isLast={isLast}
                        />
                    )
                })}
            </div>

            <Link to="/schedule" className="mt-4 w-full py-2.5 text-center text-[11px] uppercase tracking-widest font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl transition-colors border border-indigo-500/20 shrink-0 block">
                Lihat Selengkapnya
            </Link>
        </GlassCard>
    );
}