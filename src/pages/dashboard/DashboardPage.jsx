import GlassCard from "../../components/ui/GlassCard";
import CircularProgress from "../../components/ui/CircularProgress";
import ActivityHeatmap from "../../components/ui/ActivityHeatmap";
import { ActivityIcon, LucideClock } from "lucide-react";

export default function DashboardPage() {
    return <>
        <div className="w-full flex flex-col gap-6 p-4 sm:p-8">
            {/* Header */}
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p className="font-bold text-slate-600 dark:text-white/40">
                        Sunday, March 1
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-500">
                        Selamat pagi, Nugroho Nur Cahyo!
                    </h1>
                </div>
            </div>

            {/* Stats + Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                {/* Stats cards */}
                <div className="grid grid-cols-2 lg:col-span-2 gap-4">
                    <GlassCard className="flex items-center justify-start gap-2 p-6 h-48 col-span-2">
                        <CircularProgress percentage={60} size={120} />
                        <div className="ml-6">
                            <p className="text-[11px] font-black uppercase tracking-widest dark:text-white/30 text-gray-600 mb-1">Status</p>
                            <p className="text-xl sm:text-2xl dark:text-white uppercase font-extrabold text-indigo-500">
                                {60 >= 80 ? "Excellent!" : 60 >= 50 ? "On Track" : "Getting Started"}
                            </p>
                            <p className="text-sm dark:text-white/40 tracking-tight font-semibold text-gray-500">
                                4 / 4 tasks done
                            </p>
                        </div>
                    </GlassCard>
                    <GlassCard className="flex items-center justify-center gap-4 p-4 h-28 col-span-1 active:scale-95 duration-300 transition-all ease-in-out">
                        <div className="p-3 bg-indigo-600/10 rounded-xl">
                            <ActivityIcon size={28} className="text-indigo-600" />
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <h1 className="text-[13px] text-gray-600 dark:text-white/40 font-semibold">
                                Activities
                            </h1>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                0
                            </p>
                        </div>
                    </GlassCard>
                    <GlassCard className="flex items-center justify-center gap-4 p-4 h-28 col-span-1 active:scale-95 duration-300 transition-all ease-in-out">
                        <div className="p-3 bg-indigo-600/10 rounded-xl">
                            <LucideClock size={28} className="text-indigo-600" />
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <h1 className="text-[13px] text-gray-600 dark:text-white/40 font-semibold">
                                Focus Time
                            </h1>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                0 h
                            </p>
                        </div>
                    </GlassCard>
                </div>

                {/* Activity Heatmap */}
                <GlassCard className="flex flex-col lg:col-span-3 p-5 sm:p-6 h-full">
                    <ActivityHeatmap />
                </GlassCard>
            <div className="flex gap-6 items-center justify-start">
                 <div className="h-56 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-start gap-2 p-6 border border-indigo-300 dark:border-indigo-400 shadow shadow-indigo-400">
                    <CircularProgress percentage={60} size={100}  />
                    <div className="ml-8 hidden sm:block">
                        <p className="text-[10px] font-black uppercase tracking-widest dark:text-white/70 text-gray-600 mb-1">Status</p>
                        <p className="text-lg dark:text-white uppercase font-extrabold text-indigo-500">
                        {60 >= 80 ? "Excellent!" : 60 >= 50 ? "On Track" : "Getting Started"}
                        </p>
                        <p className="text-xs dark:text-white/40 tracking-tight font-semibold text-gray-500">
                        {4} / {4} tasks done
                        </p>
                    </div>
                </div>
                <div className=" flex-wrap h-56 bg-white/80">

                </div>
                <div className=" h-56 bg-indigo-700/10 backdrop-blur-liquid">

                </div>
                <div className=" h-56 bg-indigo-700/10 backdrop-blur-liquid">

                </div>
            </div>

            {/* Activities row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <GlassCard className="flex items-center justify-start gap-2 p-6 h-56" />
                <GlassCard className="flex items-center justify-start gap-2 p-6 h-56" />
                <GlassCard className="flex items-center justify-start gap-2 p-6 h-56" />
            </div>
        </div>
    </>
}