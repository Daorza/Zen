import React from "react"

export function TimelineEvent({
  time,
  title,
  duration,
  status
}) {

  return (
    <div className="flex gap-6">

      {/* time */}
      <div className="w-16 text-sm text-slate-400">
        {time}
      </div>

      {/* timeline line */}
      <div className="relative flex-1">

        <span className="absolute -left-3 top-4 h-3 w-3 rounded-full bg-slate-400"/>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="mt-2 text-xs text-slate-400">
            {time} — {duration} • {status}
          </p>

        </div>

      </div>

    </div>
  )
}