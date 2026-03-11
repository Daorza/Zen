import { ActivityIcon, LucideClock } from "lucide-react";
import CircularProgress from "../../../components/ui/CircularProgress";
import GlassCard from "../../../components/ui/GlassCard";
import ActivityHeatmap from "../../../components/ui/ActivityHeatmap";

const DashboardStatistic = () => {
    const percentage = 60;
    const tasksTotal = 4;
    const tasksDone = 4;
    const activities = 0;
    const focusHours = 0;
    const statusLabel =
        percentage >= 80 ? "Excellent!" :
            percentage >= 50 ? "On Track" :
                "Getting Started";
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Left — Stats */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-2">

                {/* Status card — full width */}
                <GlassCard className="col-span-2 flex items-center gap-6 p-6 h-48">
                    <CircularProgress percentage={percentage} size={120} />
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-widest dark:text-white/30 text-gray-600 mb-1">
                            Status
                        </p>
                        <p className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-white uppercase font-display">
                            {statusLabel}
                        </p>
                        <p className="text-sm font-semibold tracking-tight text-gray-500 dark:text-white/40">
                            {tasksDone} / {tasksTotal} tasks done
                        </p>
                    </div>
                </GlassCard>

                {/* Activities */}
                <GlassCard className="col-span-1 flex items-center gap-4 p-4 h-28 active:scale-95 transition-all duration-300">
                    <div className="p-3 bg-indigo-600/10 rounded-xl shrink-0">
                        <ActivityIcon size={24} className="text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-gray-600 dark:text-white/40">
                            Activities
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {activities}
                        </p>
                    </div>
                </GlassCard>

                {/* Focus Time */}
                <GlassCard className="col-span-1 flex items-center gap-4 p-4 h-28 active:scale-95 transition-all duration-300">
                    <div className="p-3 bg-indigo-600/10 rounded-xl shrink-0">
                        <LucideClock size={24} className="text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-gray-600 dark:text-white/40">
                            Focus Time
                        </p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {focusHours} h
                        </p>
                    </div>
                </GlassCard>
            </div>

            {/* Right — Heatmap */}
            <GlassCard className="lg:col-span-3 p-5 sm:p-6 h-full">
                <ActivityHeatmap />
            </GlassCard>
        </div>
    )
}
export default DashboardStatistic;