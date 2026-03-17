import TodoCard from "../../../components/ui/TodoCard";
import useSWR from "swr";
import api from "../../../services/api";
import GlassCard from "../../../components/ui/GlassCard";
import { Link } from "react-router-dom";
export const DashboardTask = () => {
    const { data: tasksResponse, isLoading } = useSWR("/activities?type=task", async (url) => {
        const res = await api.get(url);
        return res.data;
    });

    const tasks = tasksResponse?.data ?? [];
    
    // Filter for "today"
    const today = new Date().toISOString().split("T")[0];
    const todayFiltered = tasks.filter(t => {
        if (!t.date) return false;
        return new Date(t.date).toISOString().split("T")[0] === today;
    });

    const DATA = todayFiltered.slice(0, 3);
    return (
        <GlassCard skeleton={isLoading} className="flex flex-col p-6 w-full h-full justify-between">
            <div className="w-full flex flex-col gap-3 flex-1">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Today&apos;s Tasks</h2>
                {isLoading && <p className="text-xs text-slate-500 dark:text-slate-400">Loading tasks...</p>}
                {!isLoading && DATA.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400">No tasks for today.</p>}
                {DATA.map((task, i) => {
                    return (
                        <TodoCard
                            key={task.id}
                            task={task}
                            onToggle={() => { }}
                            onDelete={() => { }}
                            onClick={() => { }}
                            small
                        />
                    )
                })}
            </div>

            <Link to="/task" className="mt-4 w-full py-2.5 text-center text-[11px] uppercase tracking-widest font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl transition-colors border border-indigo-500/20 shrink-0 block">
                Lihat Selengkapnya
            </Link>
        </GlassCard>
    )
}