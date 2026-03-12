import React from "react";
import { LucideCircle  } from "lucide-react";

export function TimelineEvent({ time, title, duration, status, isLast }) {
  return (
    <div className="grid grid-cols-[70px_20px_1fr] gap-4">

      {/* TIME */}
      <div className="text-sm text-slate-400 text-right pt-1">
        {time}
      </div>

      {/* LINE + DOT */}
      <div className="relative flex justify-center">

        {/* vertical line */}
        {!isLast && (
          <span className="absolute top-3 bottom-0 w-px bg-white/10" />
        )}

        {/* dot */}
        <span className="h-3 w-3 rounded-full bg-indigo-500 z-10 mt-1" />

      </div>

      {/* EVENT CARD */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-2 text-xs text-slate-400 flex gap-2 items-center-safe">
          {duration} 
          <span className="size-1 rounded-full bg-slate-400" />
          {status}
        </p>
      </div>

    </div>
  );
}