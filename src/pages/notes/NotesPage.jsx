import { useState, useEffect, useMemo } from "react";
import { CategoryFilter } from "../../components/notes/CategoryFilter";
import { NotesGrid } from "../../components/notes/NotesGrid";
import { MagicButton } from "../../components/ui/MagicButton";
import { LucidePlus } from "lucide-react";
import SearchBar from "../../components/ui/SearchBar";
import { NewNoteModal } from "../../components/notes/NewNoteModal";
import api from "../../services/api";

const categories = ["Personal", "Work", "Learning", "Finance"];

export default function NotesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const [notesRes, catRes] = await Promise.all([
        api.get("/notes"),
        api.get("/notes/categories"),
      ]);

      setNotes(notesRes.data.data ?? []);
      setCategories(catRes.data.data ?? []);
    } catch (error) {
      console.error("Gagal memuat catatan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchCategory =
        activeCategory === "All" || note.category === activeCategory;

      const matchSearch =
        search === "" ||
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [notes, activeCategory, search]);

  const handleSaved = () => {
    setModalOpen(false);
    fetchNotes();
  };

  return (
    <>
      <NewNoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
        categories={categories}
        onCategoryAdded={(newCat) => setCategories((prev) => [...prev, newCat])}
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

        <NotesGrid notes={filteredNotes} loading={loading} />
      </div>
    </>
  );
}
