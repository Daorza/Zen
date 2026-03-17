import { formatDuration } from "../../lib/formatter";
import { TimelineEvent } from "./TimelineEvent";
import { FireIcon } from "@heroicons/react/24/solid";
import { MagicButton } from "../ui/MagicButton";
import { LucidePlus } from "lucide-react";

function formatDate(date) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const normalize = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const selected = normalize(date);
  if (selected === normalize(today))
    return "Hari Ini";

  if (selected === normalize(tomorrow))
    return "Besok";

  if (selected === normalize(yesterday))
    return "Kemarin";

  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function Timeline({
  schedules = [], selectedDate = new Date(), loading = false, onAddClick, onEventClick
}) {

  const dateLabel = formatDate(selectedDate);

  return (
    <div className="space-y-6">

      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          TIMELINE
        </p>

        <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-wide">
          {dateLabel}
        </h2>
      </div>

      {loading && (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="grid grid-cols-[70px_20px_1fr] gap-4 animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-white/10 rounded mt-1" />
              <div className="flex justify-center pt-1">
                <div className="size-3 rounded-full bg-slate-200 dark:bg-white/10" />
              </div>
              <div className="rounded-2xl bg-slate-100 dark:bg-white/5 h-16" />
            </div>
          ))}
        </div>
      )}

      {!loading && schedules.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-600 dark:text-slate-400">
          <div className="relative flex justify-center items-center mb-2">
            <span className="size-10 absolute rounded-full bg-amber-300/60 blur-glass" />
            <FireIcon className="size-10 relative fill-orange-600" />
          </div>
          <p className="text-sm font-medium mb-4">Tidak ada jadwal untuk hari ini</p>
          <MagicButton variant="primary" onClick={onAddClick} >
            Ayo, Mulai Harimu!
          </MagicButton>
        </div>
      )}

      {!loading && schedules.length > 0 && (
        <div className="space-y-6">
          {schedules.map((event, i) => (
            <TimelineEvent
              key={event.id}
              time={event.startTime}
              title={event.title}
              duration={formatDuration(event.startTime, event.endTime)}
              status={event.status}
              priority={event.priority}
              linkUrl={event.linkUrl}
              isLast={i === schedules.length - 1}
              onClick={() => onEventClick?.(event)}
            />
          ))}
        </div>
      )}


    </div>
  );
}