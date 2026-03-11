import { LucideCalendar, LucideCheck, LucideClock, Trash2 } from "lucide-react"

const TASK_LOG = [
    {
        id: "1",
        title: "Task tambahan",
        date: "2026-03-11",
        status: "pending",
        start_time: "12:00",
        end_time: "14:00",
        priority: "HIGH"
    }
]

const TodoCard = ({ task }) => {
    const done = task.status === "done"

    return (
        <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/30 dark:bg-white/5 border border-indigo-100 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-200">

            {/* Checkbox */}
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors duration-200 ${done ? "bg-indigo-500 border-indigo-500" : "border-slate-400 dark:border-white/30"}`}>
                {done && <LucideCheck size={12} strokeWidth={3} className="text-white" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${done ? "line-through text-slate-400 dark:text-white/30" : "text-gray-800 dark:text-white/90"}`}>
                    {task.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400 dark:text-white/30 font-medium">
                    <span className="flex items-center gap-1">
                        <LucideCalendar size={11} />
                        {task.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                        <LucideClock size={11} />
                        {task.start_time}–{task.end_time}
                    </span>
                </div>
            </div>

            {/* Delete button — visible on hover */}
            <button
                onClick={() => { }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg text-slate-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 cursor-pointer shrink-0"
            >
                <Trash2 size={15} strokeWidth={2} />
            </button>

        </div>
    )
}

const MainTaskSection = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            {TASK_LOG.map((task) => (
                <TodoCard key={task.id} task={task} />
            ))}
        </div>
    )
}

export default MainTaskSection;
