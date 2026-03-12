import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export function NotesSearch() {
  return (
    <div className="group relative">
      <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500 transition group-focus-within:text-indigo-400" />

      <input type="text" 
        placeholder="Search notes...."
        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 px-10 text-sm text-white outline-none transition focus:border-indigo-500 focus:bg-white/10"
      />
    </div>
  )
}
