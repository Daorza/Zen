import { useState } from "react";
import GlassCard from "../../components/ui/GlassCard";
import { CalendarWidget } from "../../components/schedule/CalendarWidget";
import { DayProgressWidget } from "../../components/schedule/DayProgressWidget";
import { ActivitiesWidget } from "../../components/schedule/ActivitiesWidget";
import { Timeline } from "../../components/schedule/Timeline";
import { TimelineEvent } from "../../components/schedule/TimelineEvent";
import { MagicButton } from "../../components/ui/MagicButton";
import { LucidePlus } from "lucide-react";
import { NewScheduleModal } from "../../components/schedule/NewScheduleModal";
import { ScheduleDetail } from "../../components/schedule/ScheduleDetail";
import { useSchedules } from "../../hooks/useSchedules";
import ConfirmModal from "../../components/ui/ConfirmModal";

export default function SchedulePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);

  const {
    schedulesForSelectedDate,
    scheduledDates,
    dayStats,
    loading,
    selectedDate,
    setSelectedDate,
    addSchedule,
    updateSchedule,
    deleteSchedule,
  } = useSchedules();

  const handleUpdate = async (id, payload) => {
    const updated = await updateSchedule(id, payload);
    if (updated) setSelectedSchedule(updated); // Sync details pane
  };

  const handleAskDelete = (id) => {
    setTargetDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!targetDeleteId) return;

    try {
      await deleteSchedule(targetDeleteId);

      if (selectedSchedule?.id === targetDeleteId) {
        setSelectedSchedule(null);
      }
    } finally {
      setTargetDeleteId(null);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <NewScheduleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={() => setModalOpen(false)}
        addSchedule={addSchedule}
        selectedDate={selectedDate}
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
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

          {/* TIMELINE OR DETAIL */}
          <GlassCard className="lg:col-span-3 p-6 min-h-90 relative overflow-hidden">
            {selectedSchedule ? (
              <ScheduleDetail
                schedule={selectedSchedule}
                onClose={() => setSelectedSchedule(null)}
                onUpdate={handleUpdate}
                onDelete={handleAskDelete}
              />
            ) : (
              <Timeline
                schedules={schedulesForSelectedDate}
                selectedDate={selectedDate}
                loading={loading}
                onAddClick={() => setModalOpen(true)}
                onEventClick={(evt) => setSelectedSchedule(evt)}
              />
            )}
          </GlassCard>
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus jadwal?"
        description="Jadwal yang dihapus tidak bisa dikembalikan."
        confirmText="Hapus"
        variant="danger"
      />
    </>
  );
}
