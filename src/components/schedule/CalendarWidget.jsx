import React from "react"

export function CalendarWidget({ month = "March 2026", days = [] }) {

  const week = ["SU","MO","TU","WE","TH","FR","SA"]

  return (
    <div className="space-y-5">

      <div className="flex justify-between items-center text-sm font-semibold tracking-wider text-slate-400">
        <button>{"<"}</button>
        <span>{month.toUpperCase()}</span>
        <button>{">"}</button>
      </div>

      <div className="grid grid-cols-7 text-xs text-slate-500">
        {week.map(d => (
          <span key={d} className="text-center">{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d,i)=>(
          <button
            key={i}
            className={`
              h-9 w-9 rounded-xl text-sm
              ${d.active 
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5"}
            `}
          >
            {d.value}
          </button>
        ))}
      </div>

    </div>
  )
}