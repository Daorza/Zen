import { LucideFlame } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import GlassCard from "../../../components/ui/GlassCard";
import gamificationService from "../../../services/app/gamificationService";

const STREAK_STYLES = [
    {
        // 0 - mati
        container: "bg-linear-to-br from-slate-400/10 to-slate-500/5 border border-slate-400/20 dark:from-slate-600/20 dark:to-slate-700/10 dark:border-slate-500/25",
        glow: "bg-slate-400/15 dark:bg-slate-500/20",
        icon: "text-slate-400 dark:text-slate-500",
        number: "text-slate-500 dark:text-slate-400",
        label: "text-slate-400/70 dark:text-slate-500/60",
    },
    {
        // 1 - nyala dikit
        container: "bg-linear-to-br from-orange-900/15 to-orange-800/8 border border-orange-800/20 dark:from-orange-900/25 dark:to-orange-800/15 dark:border-orange-800/30",
        glow: "bg-orange-700/15 dark:bg-orange-800/20",
        icon: "text-orange-700/70 dark:text-orange-700",
        number: "text-orange-700/80 dark:text-orange-600",
        label: "text-orange-700/50 dark:text-orange-700/50",
    },
    {
        // 2
        container: "bg-linear-to-br from-orange-600/15 to-orange-500/8 border border-orange-500/22 dark:from-orange-700/22 dark:to-orange-600/12 dark:border-orange-600/28",
        glow: "bg-orange-500/15 dark:bg-orange-600/20",
        icon: "text-orange-500/80 dark:text-orange-500",
        number: "text-orange-600/85 dark:text-orange-500",
        label: "text-orange-500/60 dark:text-orange-500/55",
    },
    {
        // 3
        container: "bg-linear-to-br from-orange-500/18 to-orange-400/10 border border-orange-400/25 dark:from-orange-600/22 dark:to-orange-500/15 dark:border-orange-500/30",
        glow: "bg-orange-400/18 dark:bg-orange-500/22",
        icon: "text-orange-500 dark:text-orange-400",
        number: "text-orange-500 dark:text-orange-400",
        label: "text-orange-400/65 dark:text-orange-400/60",
    },
    {
        // 4
        container: "bg-linear-to-br from-orange-500/22 to-red-500/12 border border-orange-400/30 dark:from-orange-500/25 dark:to-red-500/18 dark:border-orange-400/35",
        glow: "bg-orange-400/22 dark:bg-orange-400/28",
        icon: "text-orange-500 dark:text-orange-400",
        number: "text-orange-600 dark:text-orange-300",
        label: "text-orange-500/70 dark:text-orange-400/65",
    },
];

const DashboardHeader = ({ name }) => {
    const { loading, error, data } = useFetch(() => gamificationService.get(), "user-gamification");
    const [style, setStyle] = useState(STREAK_STYLES[0]);
    useEffect(() => {
        console.log(data)
        const clampedStreak = Math.min(Math.max(data?.currentStreak ?? 0, 0), 4);
        const customStyle = STREAK_STYLES[clampedStreak];
        setStyle(customStyle);
    }, [data])


    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-500 dark:text-indigo-100">
                    Selamat pagi, {name.split(' ')[0]}!
                </h1>
                <p className="font-bold text-slate-600 dark:text-white/40">
                    Sunday, March 1
                </p>
            </div>

            {/* Streak Badge */}
            {
                loading
                    ? <GlassCard className="px-4 py-2 w-40 h-14" skeleton />
                    : <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-500 ${style.container}`}>
                        <div className="relative flex items-center justify-center">
                            <div className={`absolute w-8 h-8 rounded-full blur-sm transition-all duration-500 ${style.glow}`} />
                            <LucideFlame
                                className={`relative w-6 h-6 transition-all duration-500 ${style.icon}`}
                                strokeWidth={2.5}
                            />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className={`text-base font-extrabold tabular-nums transition-all duration-500 ${style.number}`}>
                                {data?.currentStreak ?? 0}
                            </span>
                            <span className={`text-[10px] font-semibold uppercase tracking-widest transition-all duration-500 ${style.label}`}>
                                {data?.currentStreak ?? 0 === 0 ? "no streak" : "days streak"}
                            </span>
                        </div>
                    </div>
            }

        </div>
    );
};

export default DashboardHeader;