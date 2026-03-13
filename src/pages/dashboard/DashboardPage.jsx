import GlassCard from "../../components/ui/GlassCard";
import CircularProgress from "../../components/ui/CircularProgress";
import ActivityHeatmap from "../../components/ui/ActivityHeatmap";
import { ActivityIcon, LucideClock } from "lucide-react";
import DashboardHeader from "./features/DashboardHeader";
import DashboardStatistic from "./features/DashboardStatistic";
import { useFetch } from "../../hooks/useFetch";
import gamificationService from "../../services/app/gamificationService";
import { useEffect } from "react";
import authStore from "../../storage/authStore";

export default function DashboardPage() {
    const { name } = authStore.getUser();
    return (
        <div className="w-full flex flex-col gap-6 p-4 sm:p-8 pb-28 md:pb-8">

            {/* Header */}
            <DashboardHeader name={name} />
            {/* Stats + Heatmap */}
            <DashboardStatistic />
            {/* Bottom — Activity cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <GlassCard className="flex items-center justify-start gap-2 p-6 h-56" skeleton />
                <GlassCard className="flex items-center justify-start gap-2 p-6 h-56" skeleton />
                <GlassCard className="flex items-center justify-start gap-2 p-6 h-56" skeleton />
            </div>

        </div>
    );
}