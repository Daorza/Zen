import { DashboardTimelineEvent } from "../../../components/dashboard/DashboardTimelineEvent";
import useSWR from "swr";
import api from "../../../services/api";
import GlassCard from "../../../components/ui/GlassCard";
import { Link } from "react-router-dom";


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
                    const isLast = i === DATA.length - 1;
                    return (
                        <DashboardTimelineEvent
                            key={schedule.id}
                            schedule={schedule}
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