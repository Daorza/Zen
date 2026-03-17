import GlassCard from "../../components/ui/GlassCard";
import DashboardHeader from "./features/DashboardHeader";
import DashboardStatistic from "./features/DashboardStatistic";
import authStore from "../../storage/authStore";
import { DashboardSchedules } from "./features/DashboardSchedules";
import { DashboardTask } from "./features/DashboardTask";
import { DashboardNotes } from "./features/DashboardNotes";

export default function DashboardPage() {
    const { name } = authStore.getUser();
    return (
        <div className="w-full flex flex-col gap-6 p-4 sm:p-8 pb-28 md:pb-8">

            {/* Header */}
            <DashboardHeader name={name} />
            {/* Stats + Heatmap */}
            <DashboardStatistic />
            {/* Bottom — Activity cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                <DashboardSchedules />
                <DashboardTask />
                <DashboardNotes />
            </div>

        </div>
    );
}