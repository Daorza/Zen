import { useState } from "react";
import { CategoryFilter } from "../../components/notes/CategoryFilter";
import { NotesGrid } from "../../components/notes/NotesGrid";
import { MagicButton } from "../../components/ui/MagicButton";
import { LucidePlus } from "lucide-react";
import SearchBar from "../../components/ui/SearchBar";
import { AddCategoryModal } from "../../components/notes/AddCategoryModal";
import { useNotes } from "../../hooks/useNotes";
import { AddNoteModal } from "../../components/notes/AddNoteModal";
import { NoteDetail } from "../../components/notes/NoteDetail";

export default function NotesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [addCatModalOpen, setAddCatModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

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
    togglePin,
    updateNote,
    deleteNote,
    deleteCategory,
  } = useNotes();

  // fix: cari id dari nama category, lalu panggil deleteCategory(id)
  const handleDeleteCategory = (categoryName) => {
    const cat = categories.find((c) => c.name === categoryName);
    if (!cat) return;
    deleteCategory(cat.id);
    if (activeCategory === categoryName) {
      setActiveCategory("All");
    }
  };

  const handleUpdateNote = async (id, payload) => {
    const updatedNote = await updateNote(id, payload);
    if (updatedNote) {
      setSelectedNote(updatedNote);
    }
  };

  return (
    <>
      <AddCategoryModal
        isOpen={addCatModalOpen}
        onClose={() => setAddCatModalOpen(false)}
        onAdd={addCategory}
      />
      <AddNoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={() => setModalOpen(false)}
        categories={categories}
        addNote={addNote}
        addCategory={addCategory}
      />
      <div className="w-full flex flex-col gap-6 p-4 sm:p-8 pb-28 md:pb-8">
        {!selectedNote ? (
          <>
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
              onOpenAddCategory={() => setAddCatModalOpen(true)}
              onDeleteCategory={handleDeleteCategory}
            />
            <NotesGrid
              notes={filteredNotes}
              loading={loading}
              error={error}
              togglePin={togglePin}
              handleDeleteNote={deleteNote}
              onNoteClick={(note) => setSelectedNote(note)}
            />
          </>
        ) : (
          <NoteDetail
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
            onUpdate={handleUpdateNote}
            togglePin={togglePin}
            deleteNote={deleteNote}
            categories={categories}
          />
        )}
      </div>
    </>
  );
}