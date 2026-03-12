import { useState } from "react"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

export function CalendarWidget() {

  const week = ["SU","MO","TU","WE","TH","FR","SA"]

  const today = new Date()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthLabel = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  })

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const calendarCells = []

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarCells.push({
      value: prevMonthDays -i,
      currentMonth: false
    })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push({
      value: i,
      currentMonth: true
    })
  }

  while (calendarCells.length < 35) {
    calendarCells.push({
      value: calendarCells.length - daysInMonth - firstDayOfMonth + 1,
      currentMonth: false
    })
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const isToday = (day) => {
    return (
      day.value === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear() &&
      day.currentMonth
    )
  }

  const isSelected = (day) => {
    if (!selectedDate) return false

    return (
      day.value === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    )
  }

  return (
    <div className="space-y-5">

      <div className="flex justify-between items-center text-sm font-semibold tracking-wider text-slate-400">
        <button onClick={prevMonth}>
          <ChevronLeftIcon className="size-5 cursor-pointer" />
        </button>

        <span className="text-sm font-black ">
          {monthLabel.toUpperCase()}
        </span>

        <button onClick={nextMonth}>
          <ChevronRightIcon className="size-5 cursor-pointer" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-slate-500 place-items-center-safe">
        {week.map(d => (
          <span key={d} className="">{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">

        {calendarCells.map((day, i) => {

          const todayStyle = isToday(day)
          const selectedStyle = isSelected(day)

          return (
            <button
              key={i}
              onClick={() => {
                if (day.currentMonth) {
                  setSelectedDate(new Date(year, month, day.value))
                }
              }}

            className={`
              ml-2 relative size-9 cursor-pointer rounded-2xl text-sm flex items-center justify-center transition
              ${!day.currentMonth && "text-slate-600"}
              ${day.currentMonth && "text-slate-300 hover:bg-white/5"}
              ${todayStyle && "border border-indigo-500"}
              ${selectedStyle && "bg-indigo-600 text-white"}
            `}
            >
              <span className="">
                {day.value}
              </span>

              {day.currentMonth && Math.random() > 0.85 && (
                <span className="absolute bottom-1 size-1 rounded-full bg-indigo-400" />
              )}
            </button>
          )
        })}

      </div>
    </div>
  )
}