import { useState, useEffect, useMemo } from "react";
import GlassCard from "../../components/ui/GlassCard";
import { CalendarWidget } from "../../components/schedule/CalendarWidget";
import { DayProgressWidget } from "../../components/schedule/DayProgressWidget";
import { ActivitiesWidget } from "../../components/schedule/ActivitiesWidget";
import { Timeline } from "../../components/schedule/Timeline";
import { TimelineEvent } from "../../components/schedule/TimelineEvent";
import { MagicButton } from "../../components/ui/MagicButton";
import { LucidePlus } from "lucide-react";
import { NewScheduleModal } from "../../components/schedule/NewScheduleModal";
import api from "../../services/api";

export default function SchedulePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const res = await api.get("/activities?type=schedules");
      setSchedules(res.data.data ?? []);
    } catch (err) {
      console.error("Gagal memuat jadwal:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const schedulesSelectedDate = useMemo(() => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    return schedules
      .filter((s) => s.date.startsWith(dateStr))
      .sort((a, b) => a.startTime.localCompare(b.startTime));
  }, [schedules, selectedDate]);

  const scheduledDates = useMemo(() => {
    return new Set(schedules.map((s) => s.date.split("T")[0]));
  }, [schedules]);

  const dayStats = useMemo(() => {
    const list = schedulesSelectedDate;
    const total = list.length;
    const done = list.filter((s) => s.status === "done").length;
    const active = list.filter((s) => s.status === "progress").length;
    const pending = list.filter((s) => s.status === "pending").length;

    const totalMinutes = list.reduce((acc, s) => {
      const [startHours, startMinutes] = s.startTime.split(":").map(Number);
      const [endHours, endMinutes] = s.endTime.split(":").map(Number);
      return (
        acc + (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes)
      );
    }, 0);

    const hours = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;

    return { total, done, active, pending, hours, progress };
  }, [schedulesSelectedDate]);

  const handleSaved = () => {
    setModalOpen(false);
    fetchSchedules();
  };

  return (
    <>
      <NewScheduleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaved}
      />

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
          <MagicButton variant="primary" onClick={() => setModalOpen(true)}>
            <LucidePlus size={16} />
            Tambah Jadwal
          </MagicButton>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* LEFT SIDEBAR */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {/* Kalender */}
            <GlassCard className="p-5 h-90">
              <CalendarWidget
                scheduledDates={scheduledDates}
                onDateSelect={setSelectedDate}
              />
            </GlassCard>

            {/* Day Progress */}
            <GlassCard className="p-5 h-35">
              <DayProgressWidget
                progress={dayStats.progress}
                done={dayStats.done}
                active={dayStats.active}
                total={dayStats.total}
                hours={dayStats.hours}
              />
            </GlassCard>

            {/* Activities */}
            <GlassCard className="p-5 h-25">
              <ActivitiesWidget pending={dayStats.pending} />
            </GlassCard>
          </div>

          {/* TIMELINE */}
          <GlassCard className="lg:col-span-3 p-6 min-h-90">
            <Timeline>
              <TimelineEvent
                schedules={schedulesSelectedDate}
                selectedDate={selectedDate}
                loading={loading}
              />
            </Timeline>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
