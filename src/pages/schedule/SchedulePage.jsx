import GlassCard from "../../components/ui/GlassCard";
import { CalendarWidget } from "../../components/schedule/CalendarWidget";
import { DayProgressWidget } from "../../components/schedule/DayProgressWidget";
import { ActivitiesWidget } from "../../components/schedule/ActivitiesWidget";
import { Timeline } from "../../components/schedule/Timeline";
import { TimelineEvent } from "../../components/schedule/TimelineEvent";
import { MagicButton } from "../../components/ui/MagicButton";
import { LucidePlus } from "lucide-react";

export default function SchedulePage() {

  const name = "Nugroho Nur Cahyo";

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-8 pb-28 md:pb-8">

      {/* Header */}
       <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold dark:text-white text-gray-900">
                  Jadwal
              </h1>
              <p className="font-medium text-slate-600 dark:text-white/40">
                  Pantau jadwal harianmu!
              </p>
          </div>
          <MagicButton variant="primary">
              <LucidePlus size={16} />
              Tambah Jadwal
          </MagicButton>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* LEFT SIDEBAR */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">

          {/* Calendar */}
          <GlassCard className="p-5 h-80">
            <CalendarWidget />
          </GlassCard>

          {/* Day Progress */}
          <GlassCard className="p-5 h-35">
            <DayProgressWidget />
          </GlassCard>

          {/* Activities */}
          <GlassCard className="p-5 h-25">
            <ActivitiesWidget pending={1} />
          </GlassCard>

        </div>


        <GlassCard className="lg:col-span-3 p-6 min-h-100">
          <Timeline>
            <TimelineEvent
              time="10:00"
              title="Pergi ke Taman Mini Indonesia Indah"
              duration="1h"
              status="Pending"
            />

          </Timeline>

        </GlassCard>

      </div>

    </div>
  );
}