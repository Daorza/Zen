import React from "react"

export function ActivitiesWidget({ pending = 0 }) {

  return (
    <div className="space-y-4">

      <h3 className="text-sm font-semibold text-slate-400">
        ACTIVITIES
      </h3>

      <div className="flex justify-between text-sm">

        <span className="text-slate-400">
          Pending
        </span>

        <span className="font-semibold text-slate-200">
          {pending}
        </span>

      </div>

    </div>
  )
}