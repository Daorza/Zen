import { NotesCard } from "../../../components/notes/NotesCard";
import { useNotes } from "../../../hooks/useNotes";
import GlassCard from "../../../components/ui/GlassCard";
import { Link } from "react-router-dom";

export const DashboardNotes = () => {
    const { notes, loading } = useNotes();
    const DATA = notes.slice(0, 3);
    return (
        <GlassCard skeleton={loading} className="flex flex-col p-6 w-full h-full justify-between">
            <div className="flex flex-col gap-4 w-full flex-1">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-2 pb-1 border-b border-slate-200 dark:border-white/10">Recent Notes</h2>
                {loading && <p className="text-xs text-slate-500 dark:text-slate-400">Loading notes...</p>}
                {!loading && DATA.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400">No notes yet.</p>}
                {DATA.map((note) => (
                    <NotesCard
                        key={note.id}
                        title={note.title}
                        description={note.content}
                        date={note.relatedDate}
                        category={note.category?.name}
                        color={note.color}
                        isPinned={note.isPinned}
                        small
                    />
                ))}
            </div>

            <Link to="/notes" className="mt-4 w-full py-2.5 text-center text-[11px] uppercase tracking-widest font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl transition-colors border border-indigo-500/20 shrink-0 block">
                Lihat Selengkapnya
            </Link>
        </GlassCard>
    );
};