import { NotesCard } from "./NotesCard";
import { PaperClipIcon  } from "@heroicons/react/24/solid";

export function NotesGrid({ notes = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4 h-40"
          >
            <div className="h-4 w-2/3 rounded-sm bg-white/10" />
            <div className="h-3 w-full rounded-sm bg-white/10" />
            <div className="h-3 w-4/5 rounded-sm bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mx-auto py-24 gap-4 text-slate-500">
        <div className="relative flex justify-center items-center">
          <span className="size-10 absolute rounded-full bg-cyan-300/60 blur-glass" />
          <PaperClipIcon className="size-10 relative fill-indigo-600" />
        </div>
        <p className="text-sm font-medium">Belum ada catatan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NotesCard 
          key={note.id}
          title={note.title}
          description={note.content}
          category={note.category}
          date={note.createdAt}
        />
      ))}
    </div>
  )
}
