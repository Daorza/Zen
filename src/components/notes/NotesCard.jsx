import { CalendarDaysIcon } from "@heroicons/react/24/outline"

export function NotesCard({title, description, date}) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 hover:border-white/20">
      
      <h2 className="font-semibold text-white">
        {title}
      </h2>

      <p className="mt-4 text-sm text-slate-400 line-clamp-3">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
        <CalendarDaysIcon className="size-4" />
        <time dateTime={date}>{date}</time>
        {date}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-linear-to-r from-indigo-500/10 to-purple-500/10"/>
    </div>
  )
}
