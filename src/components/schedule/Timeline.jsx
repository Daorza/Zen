import { TimelineEvent } from "./TimelineEvent";
import { FireIcon } from "@heroicons/react/24/solid";

function formatDate(date) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const normalize = (d) => d.toISOString().split("T")[0];

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

function formatDuration(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
  if (totalMinutes <= 0) return "-";
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) 
    return `${hours}j ${minutes}m`;

  if (hours > 0) 
    return `${hours}j`;

  return `${minutes}m`;
}

export function Timeline({ 
  schedules = [], selectedDate = new Date(), loading = false 
}) {

  const dateLabel = formatDate(selectedDate);

  return (
    <div className="space-y-6">

      <div>
        <p className="text-xs font-semibold text-slate-400">
          TIMELINE
        </p>

        <h2 className="text-lg font-bold text-white tracking-wide">
          {dateLabel}
        </h2>
      </div>

      {loading && (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="grid grid-cols-[70px_20px_1fr] gap-4 animate-pulse">
              <div className="h-4 bg-white/10 rounded mt-1" />
              <div className="flex justify-center pt-1">
                <div className="size-3 rounded-full bg-white/10" />
              </div>
              <div className="rounded-2xl bg-white/5 h-16" />
            </div>
          ))}
        </div>
      )}
 
      {!loading && schedules.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-500">
          <div className="relative flex justify-center items-center">
            <span className="size-10 absolute rounded-full bg-amber-300/60 blur-glass" />
            <FireIcon className="size-10 relative fill-orange-600" />
          </div>
          <p className="text-sm font-medium">Tidak ada jadwal untuk hari ini</p>
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
              isLast={i === schedules.length - 1}
            />
          ))}
        </div>
      )}


    </div>
  );
}