import { TimelineEvent } from "./TimelineEvent";

export function Timeline() {

  const events = [
    { time: "08:00", title: "Morning Planning", duration: "30 min", status: "done" },
    { time: "09:30", title: "Design Review", duration: "1 hour", status: "in progress" },
    { time: "11:00", title: "Client Meeting", duration: "45 min", status: "upcoming" }
  ];

  return (
    <div className="space-y-6">

      <div>
        <p className="text-xs font-semibold text-slate-400">
          TIMELINE
        </p>

        <h2 className="text-lg font-bold text-white tracking-wide">
          Today
        </h2>
      </div>

      <div className="space-y-6">

        {events.map((event, i) => (
          <TimelineEvent
            key={i}
            {...event}
            isLast={i === events.length - 1}
          />
        ))}

      </div>

    </div>
  );
}