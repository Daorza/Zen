import { useMemo, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

const MOCK_LOGS = [
  { id: 1, date: "2026-02-06", tasks_completed: 2, focus_minutes: 40 },
  { id: 2, date: "2026-02-07", tasks_completed: 0, focus_minutes: 0 },
  { id: 3, date: "2026-02-08", tasks_completed: 4, focus_minutes: 90 },
  { id: 4, date: "2026-02-09", tasks_completed: 1, focus_minutes: 20 },
  { id: 5, date: "2026-02-10", tasks_completed: 6, focus_minutes: 120 },
  { id: 6, date: "2026-02-11", tasks_completed: 3, focus_minutes: 60 },
  { id: 7, date: "2026-02-12", tasks_completed: 0, focus_minutes: 0 },
  { id: 8, date: "2026-02-13", tasks_completed: 7, focus_minutes: 150 },
  { id: 9, date: "2026-02-14", tasks_completed: 9, focus_minutes: 200 },
  { id: 10, date: "2026-02-15", tasks_completed: 2, focus_minutes: 45 },
  { id: 11, date: "2026-02-16", tasks_completed: 0, focus_minutes: 0 },
  { id: 12, date: "2026-02-17", tasks_completed: 4, focus_minutes: 80 },
  { id: 13, date: "2026-02-18", tasks_completed: 8, focus_minutes: 175 },
  { id: 14, date: "2026-02-19", tasks_completed: 3, focus_minutes: 55 },
  { id: 15, date: "2026-02-20", tasks_completed: 1, focus_minutes: 15 },
  { id: 16, date: "2026-02-21", tasks_completed: 10, focus_minutes: 220 },
  { id: 17, date: "2026-02-22", tasks_completed: 5, focus_minutes: 100 },
  { id: 18, date: "2026-02-23", tasks_completed: 0, focus_minutes: 0 },
  { id: 19, date: "2026-02-24", tasks_completed: 2, focus_minutes: 35 },
  { id: 20, date: "2026-02-25", tasks_completed: 7, focus_minutes: 140 },
  { id: 21, date: "2026-02-26", tasks_completed: 4, focus_minutes: 85 },
  { id: 22, date: "2026-02-27", tasks_completed: 1, focus_minutes: 20 },
  { id: 23, date: "2026-02-28", tasks_completed: 3, focus_minutes: 65 },
  { id: 24, date: "2026-03-01", tasks_completed: 8, focus_minutes: 180 },
  { id: 25, date: "2026-03-02", tasks_completed: 2, focus_minutes: 40 },
  { id: 26, date: "2026-03-03", tasks_completed: 0, focus_minutes: 0 },
  { id: 27, date: "2026-03-04", tasks_completed: 6, focus_minutes: 130 },
  { id: 28, date: "2026-03-05", tasks_completed: 9, focus_minutes: 200 },
  { id: 29, date: "2026-03-06", tasks_completed: 3, focus_minutes: 60 },
  { id: 30, date: "2026-03-07", tasks_completed: 1, focus_minutes: 25 },
  { id: 31, date: "2025-03-15", tasks_completed: 1, focus_minutes: 20 },
  { id: 32, date: "2025-03-22", tasks_completed: 3, focus_minutes: 60 },
  { id: 33, date: "2025-04-01", tasks_completed: 2, focus_minutes: 45 },
  { id: 34, date: "2025-04-10", tasks_completed: 6, focus_minutes: 120 },
  { id: 35, date: "2025-04-18", tasks_completed: 1, focus_minutes: 15 },
  { id: 36, date: "2025-05-05", tasks_completed: 4, focus_minutes: 80 },
  { id: 37, date: "2025-05-19", tasks_completed: 2, focus_minutes: 40 },
  { id: 38, date: "2025-06-02", tasks_completed: 7, focus_minutes: 150 },
  { id: 39, date: "2025-06-14", tasks_completed: 1, focus_minutes: 20 },
  { id: 40, date: "2025-06-28", tasks_completed: 3, focus_minutes: 55 },
  { id: 41, date: "2025-07-04", tasks_completed: 9, focus_minutes: 200 },
  { id: 42, date: "2025-07-15", tasks_completed: 2, focus_minutes: 35 },
  { id: 43, date: "2025-07-29", tasks_completed: 5, focus_minutes: 100 },
  { id: 44, date: "2025-08-10", tasks_completed: 1, focus_minutes: 20 },
  { id: 45, date: "2025-08-22", tasks_completed: 6, focus_minutes: 110 },
  { id: 46, date: "2025-09-03", tasks_completed: 3, focus_minutes: 65 },
  { id: 47, date: "2025-09-17", tasks_completed: 2, focus_minutes: 40 },
  { id: 48, date: "2025-10-01", tasks_completed: 8, focus_minutes: 170 },
  { id: 49, date: "2025-10-14", tasks_completed: 1, focus_minutes: 15 },
  { id: 50, date: "2025-10-28", tasks_completed: 4, focus_minutes: 75 },
  { id: 51, date: "2025-11-06", tasks_completed: 2, focus_minutes: 30 },
  { id: 52, date: "2025-11-19", tasks_completed: 7, focus_minutes: 145 },
  { id: 53, date: "2025-12-02", tasks_completed: 3, focus_minutes: 60 },
  { id: 54, date: "2025-12-15", tasks_completed: 1, focus_minutes: 20 },
  { id: 55, date: "2025-12-27", tasks_completed: 5, focus_minutes: 105 },
  { id: 56, date: "2026-01-08", tasks_completed: 2, focus_minutes: 45 },
  { id: 57, date: "2026-01-19", tasks_completed: 4, focus_minutes: 90 },
  { id: 58, date: "2026-01-28", tasks_completed: 1, focus_minutes: 25 },
];

function logsToMap(logs) {
  return logs.reduce((acc, entry) => {
    acc[entry.date] = {
      tasks: entry.tasks_completed,
      focus: entry.focus_minutes,
    };
    return acc;
  }, {});
}

function countToLevel(tasks) {
  if (tasks === 0) return 0;
  if (tasks <= 2) return 1;
  if (tasks <= 5) return 2;
  if (tasks <= 8) return 3;
  return 4;
}

const LEVEL_CLASSES = [
  "bg-indigo-100/60  dark:bg-white/5",
  "bg-indigo-300/70  dark:bg-indigo-700/60",
  "bg-indigo-400/80  dark:bg-indigo-500/70",
  "bg-indigo-500     dark:bg-indigo-400",
  "bg-indigo-600     dark:bg-indigo-300",
];

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CELL = 16;
const GAP = 2;
const STEP = CELL + GAP;

// Tooltip component yang bisa mengukur dirinya sendiri dan menyesuaikan posisi
function Tooltip({ tooltip }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    const MARGIN = 8;

    let left = tooltip.x + MARGIN;
    let top = tooltip.y - height - MARGIN;

    // Jika tooltip melewati batas kanan, flip ke kiri
    if (left + width > window.innerWidth - MARGIN) {
      left = tooltip.x - width - MARGIN;
    }

    // Jika tooltip melewati batas atas, tampilkan di bawah cursor
    if (top < MARGIN) {
      top = tooltip.y + MARGIN;
    }

    // Pastikan tidak melewati batas kiri
    if (left < MARGIN) {
      left = MARGIN;
    }

    setPos({ left, top });
  }, [tooltip.x, tooltip.y]);

  return (
    <motion.div
      ref={ref}
      key="tooltip"
      className="fixed z-[9999] pointer-events-none px-3 py-2 rounded-xl
                 text-[11px] font-semibold whitespace-nowrap
                 bg-indigo-600/95 dark:bg-indigo-500/95 text-white
                 backdrop-blur-md shadow-lg shadow-indigo-500/40"
      style={{ left: pos.left, top: pos.top }}
      initial={{ opacity: 0, y: 4, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ duration: 0.12 }}
    >
      <span className="font-black">
        {new Date(tooltip.date + "T00:00:00").toLocaleDateString("id-ID", {
          weekday: "short", day: "numeric", month: "short", year: "numeric",
        })}
      </span>
      <span className="mx-1 opacity-50">·</span>
      <span className="font-black">{tooltip.tasks}</span> tasks
      <span className="mx-1 opacity-50">·</span>
      <span className="font-black">{tooltip.focus}</span> menit fokus
    </motion.div>
  );
}

export default function ActivityHeatmap({ activityData }) {
  const dataMap = useMemo(
    () => logsToMap(activityData ?? []),
    [activityData]
  );

  const [tooltip, setTooltip] = useState(null);

  const today = new Date();

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 363);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks = [];
  const monthPositions = [];

  let cursor = new Date(startDate);
  let col = 0;
  let lastMonth = -1;

  while (col < 54) {
    const week = [];
    for (let row = 0; row < 7; row++) {
      const d = new Date(cursor);
      if (d > today) {
        week.push(null);
      } else {
        const key = d.toISOString().slice(0, 10);
        const entry = dataMap[key];
        const tasks = entry?.tasks ?? 0;
        const focus = entry?.focus ?? 0;
        const level = countToLevel(tasks);

        if (d.getMonth() !== lastMonth && row === 0) {
          monthPositions.push({ label: MONTH_LABELS[d.getMonth()], col });
          lastMonth = d.getMonth();
        }

        week.push({ date: key, tasks, focus, level });
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
    col++;
    if (cursor > today && col >= 53) break;
  }

  const totalTasks = Object.values(dataMap).reduce((acc, v) => acc + v.tasks, 0);
  const totalFocus = Object.values(dataMap).reduce((acc, v) => acc + v.focus, 0);

  const DAY_COL_W = 32;

  return (
    <div className="flex flex-col gap-3 justify-between w-full h-full">

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest dark:text-white/30 text-gray-500">
            Activity Tracker
          </p>
          <p className="text-lg font-extrabold text-indigo-500 dark:text-indigo-400 leading-tight">
            {totalTasks.toLocaleString()} tasks selesai
          </p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-1 px-1 pb-1 no-scrollbar">
        <div className="relative" style={{ minWidth: DAY_COL_W + weeks.length * STEP }}>

          <div className="relative h-4 mb-0.5" style={{ marginLeft: DAY_COL_W }}>
            {monthPositions.map(({ label, col: c }, idx) => (
              <span
                key={idx}
                className="absolute text-[9px] font-bold uppercase tracking-wider text-gray-400 dark:text-white/25 leading-none"
                style={{ left: c * STEP }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex">
            <div
              className="flex flex-col shrink-0"
              style={{ width: DAY_COL_W, gap: GAP }}
            >
              {DAY_LABELS.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center text-[8px] font-bold uppercase text-gray-400/60 dark:text-white/20"
                  style={{ height: CELL, opacity: i % 2 === 0 ? 1 : 0 }}
                >
                  {d}
                </div>
              ))}
            </div>

            <div className="flex" style={{ gap: GAP }}>
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col" style={{ gap: GAP }}>
                  {week.map((cell, dIdx) =>
                    cell === null ? (
                      <div key={dIdx} style={{ width: CELL, height: CELL }} />
                    ) : (
                      <motion.div
                        key={dIdx}
                        className={`rounded-[2px] cursor-pointer ${LEVEL_CLASSES[cell.level]}`}
                        style={{ width: CELL, height: CELL }}
                        whileHover={{ scale: 1.7, zIndex: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        onMouseMove={(e) => {
                          setTooltip({
                            x: e.clientX,
                            y: e.clientY,
                            date: cell.date,
                            tasks: cell.tasks,
                            focus: cell.focus,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {tooltip && <Tooltip tooltip={tooltip} />}
        </AnimatePresence>,
        document.body
      )}

      <div className="w-full flex justify-between items-center">
        <p className="text-[11px] text-gray-400 dark:text-white/25 font-medium">
          {Math.round(totalFocus / 60)} jam fokus · dalam 1 tahun terakhir
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-400 dark:text-white/30 font-medium mr-1">Sedikit</span>
          {LEVEL_CLASSES.map((cls, i) => (
            <div key={i} className={`w-5 h-5 rounded-[2px] ${cls}`} />
          ))}
          <span className="text-[10px] text-gray-400 dark:text-white/30 font-medium ml-1">Banyak</span>
        </div>
      </div>
    </div>
  );
}