import { useState } from "react"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

export function CalendarWidget({ scheduledDates = new Set(), onDateSelect }) {

  const week = ["SU","MO","TU","WE","TH","FR","SA"]
  const today = new Date()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthLabel = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

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
      currentMonth: true });
  }

  while (calendarCells.length < 42) {
    calendarCells.push({
      value: calendarCells.length - daysInMonth - firstDayOfMonth + 1,
      currentMonth: false,
    });
  };

  const isToday = (day) =>
    day.currentMonth &&
    day.value === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();    
  ;

  const isSelected = (day) => {
    if (!selectedDate) return false

    return (
      day.currentMonth &&
      day.value === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  const hasSchedule = (day) => {
    if (!day.currentMonth) return false;

    const pad = (n) => String(n).padStart(2, "0");
    const dateStr = `${pad}-${pad(month + 1)}-${pad(day.value)}`;
    return scheduledDates.has(dateStr);
  };

  const handleSelect = (day) => {
    if (!day.currentMonth) return;
    const date = new Date(year, month, day.value);
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  return (
    <div className="space-y-5">

       <div className="flex justify-between items-center text-sm font-semibold tracking-wider text-slate-400">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
          <ChevronLeftIcon className="size-5 cursor-pointer" />
        </button>

        <span className="text-sm font-black uppercase">
          {monthLabel}
        </span>

        <button onClick={() => setCurrentDate(new Date(year, month +1, 1))}>
          <ChevronRightIcon className="size-5 cursor-pointer" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-slate-500 place-items-center-safe">
        {week.map(d =>
          <span key={d}>
            {d}
          </span>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2">

        {calendarCells.map((day, i) => (
            <button
              key={i}
              onClick={() => {
                handleSelect(day)
              }}

            className={`
              ml-2 relative size-9 cursor-pointer rounded-2xl text-sm flex items-center justify-center transition
              ${!day.currentMonth && "text-slate-600"}
              ${day.currentMonth && "text-slate-300 hover:bg-white/5"}
              ${isToday(day) && "border border-indigo-500"}
              ${isSelected(day) && "bg-indigo-600 text-white"}
            `}
            >
              
              {day.value}

              {hasSchedule(day) && !isSelected(day) && (
                <span className="absolute bottom-1 size-1 rounded-full bg-indigo-400" />
              )}
            </button>
        ))}

      </div>
    </div>
  );
}