import React from "react"
import { Progressbar } from "../ui/Progressbar"

export function DayProgressWidget({
  progress = 0,
  done = 0,
  active = 0,
  total = 0,
  hours = "0h"
}) {

  return (
    <div className="space-y-4">

      <div className="flex justify-between text-sm font-semibold">
        <span className="text-slate-400">DAY PROGRESS</span>
        <span className="text-indigo-400">{progress}%</span>
      </div>

      <Progressbar value={progress} />

      <div className="flex gap-4 text-xs text-slate-400">

        <span>✔ Done {done}</span>
        <span>⚡ Active {active}</span>
        <span>◷ Total {total}</span>
        <span>🕒 {hours}</span>

      </div>

    </div>
  )
}