import { useState } from "react";

// ─── Dummy Data ──────────────────────────────────────────────────────────────
function generateDummyData() {
  const data = {};
  const now = new Date();
  for (let m = 11; m >= 0; m--) {
    const date = new Date(now.getFullYear(), now.getMonth() - m, 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const rand = Math.random();
      data[key] = rand < 0.25 ? 0 : rand < 0.5 ? 1 : rand < 0.7 ? 2 : rand < 0.88 ? 3 : 4;
    }
  }
  return data;
}

export const DUMMY_BEHAVIOUR_DATA = generateDummyData();

// ─── Constants ───────────────────────────────────────────────────────────────
const LEVEL_CLASSES = [
  "bg-slate-100 dark:bg-slate-700/50",
  "bg-indigo-100 dark:bg-indigo-900/60",
  "bg-indigo-200 dark:bg-indigo-700/70",
  "bg-indigo-400 dark:bg-indigo-500",
  "bg-indigo-600 dark:bg-indigo-400",
];
const LEVEL_LABELS = ["No activity", "Low", "Moderate", "High", "Very high"];
const MONTH_NAMES  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const FILTER_OPTIONS = [1, 3, 6, 12];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getMonthGrid(year, month) {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells       = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

// ─── MonthGrid ────────────────────────────────────────────────────────────────
function MonthGrid({ year, month, data, onHover, hoveredKey }) {
  const weeks = getMonthGrid(year, month);
  const pad   = (n) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col gap-1 min-w-max">
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
        {MONTH_NAMES[month]} {year}
      </p>
      <div className="flex gap-1 mb-1">
        {DAY_LABELS.map((d) => (
          <span key={d} className="w-7 text-[9px] text-slate-400 dark:text-slate-500 text-center font-semibold">
            {d}
          </span>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="flex gap-1">
          {week.map((day, di) => {
            if (!day) return <div key={di} className="w-7 h-7" />;
            const key   = `${year}-${pad(month + 1)}-${pad(day)}`;
            const level = data[key] ?? 0;
            const isHov = hoveredKey === key;
            return (
              <div
                key={di}
                onMouseEnter={() => onHover(key, level, year, month, day)}
                onMouseLeave={() => onHover(null)}
                className={`
                  w-7 h-7 rounded-md cursor-pointer transition-all duration-150
                  flex items-center justify-center
                  ${LEVEL_CLASSES[level]}
                  ${isHov
                    ? "ring-2 ring-indigo-500 dark:ring-indigo-400 ring-offset-1 dark:ring-offset-slate-800 scale-110"
                    : "hover:opacity-75"}
                `}
              >
                <span className={`text-[9px] font-bold select-none
                  ${level >= 3 ? "text-white/70" : "text-slate-400/60 dark:text-slate-500/60"}`}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── BehaviourTracker ────────────────────────────────────────────────────────
export default function BehaviourTracker({ data = DUMMY_BEHAVIOUR_DATA }) {
  const [monthsToShow, setMonthsToShow] = useState(3);
  const [tooltip,      setTooltip]      = useState(null);
  const [hoveredKey,   setHoveredKey]   = useState(null);

  const months = [];
  const now    = new Date();
  for (let i = monthsToShow - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth() });
  }

  function handleHover(key, level, year, month, day) {
    if (!key) { setTooltip(null); setHoveredKey(null); return; }
    setHoveredKey(key);
    setTooltip({ level, label: `${MONTH_NAMES[month]} ${day}, ${year}` });
  }

  return (
    <div className="w-full flex flex-col gap-5">

      {/* ── Header + Filter ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-700 dark:text-white">
            Behaviour Tracker
          </h2>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            Daily activity overview
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {FILTER_OPTIONS.map((m) => (
            <button
              key={m}
              onClick={() => setMonthsToShow(m)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer
                ${monthsToShow === m
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"}
              `}
            >
              {m}M
            </button>
          ))}
        </div>
      </div>

      {/* ── Grids ── */}
      <div className="flex gap-6 overflow-x-auto pb-2">
        {months.map(({ year, month }) => (
          <MonthGrid
            key={`${year}-${month}`}
            year={year}
            month={month}
            data={data}
            onHover={handleHover}
            hoveredKey={hoveredKey}
          />
        ))}
      </div>

      {/* ── Tooltip + Legend ── */}
      <div className="flex items-center justify-between">
        <div className="h-4">
          {tooltip ? (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <span className="font-bold text-slate-700 dark:text-slate-200">{tooltip.label}</span>
              {" — "}
              <span className={tooltip.level > 0
                ? "text-indigo-500 dark:text-indigo-400 font-semibold"
                : "text-slate-400"}>
                {LEVEL_LABELS[tooltip.level]}
              </span>
            </p>
          ) : (
            <p className="text-[11px] text-slate-300 dark:text-slate-600">Hover a day to see details</p>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-slate-400 dark:text-slate-500 mr-1 font-medium">Less</span>
          {LEVEL_CLASSES.map((cls, i) => (
            <div key={i} className={`w-4 h-4 rounded-md ${cls}`} />
          ))}
          <span className="text-[9px] text-slate-400 dark:text-slate-500 ml-1 font-medium">More</span>
        </div>
      </div>

    </div>
  );
}