import { useState, useEffect, useMemo } from "react";
import { CategoryFilter } from "../../components/notes/CategoryFilter";
import { NotesGrid } from "../../components/notes/NotesGrid";
import { MagicButton } from "../../components/ui/MagicButton";
import { LucidePlus } from "lucide-react";
import SearchBar from "../../components/ui/SearchBar";
import { NewNoteModal } from "../../components/notes/NewNoteModal";
import { useNotes } from "../../hooks/useNotes";

export default function NotesPage() {

  const [modalOpen, setModalOpen] = useState(false);
  const {
    filteredNotes,
    categories,
    loading,
    error,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    addNote,
    addCategory,
  } = useNotes();

  return (
    <>
      <NewNoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={() => setModalOpen(false)}
        categories={categories}
        addNote={addNote}
        addCategory={addCategory}
      />

      <div className="w-full flex flex-col gap-6 p-4 sm:p-8 pb-28 md:pb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold dark:text-white text-slate-900">
              Catatan
            </h1>

            <p className="font-medium text-slate-600 dark:text-white/40">
              Ingat tiap tulisanmu!
            </p>
          </div>

          <MagicButton
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2"
          >
            <LucidePlus size={16} />
            Tambah Catatan
          </MagicButton>
        </div>

        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari catatan..."
        />

        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />

        <NotesGrid notes={filteredNotes} loading={loading} error={error} />
      </div>
    </>
  );
}
