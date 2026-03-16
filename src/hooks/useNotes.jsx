import { useState, useEffect, useMemo } from "react";
import api from "../services/api";

const INITIAL_FORM = {
  title: "",
  content: "",
  category: "",
};

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const [notesRes, catsRes] = await Promise.all([
        api.get("/notes"),
        api.get("/notes/categories"),
      ]);
      setNotes(notesRes.data.data ?? []);
      setCategories(catsRes.data.data ?? []);
    } catch (err) {
      setError(err?.response?.data?.message ?? "Gagal memuat catatan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchCat =
        activeCategory === "All" || note.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        note.title.toLowerCase().includes(q) ||
        note.content?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [notes, activeCategory, search]);

  const addNote = async (payload) => {
    const res = await api.post("/notes", {
      title: payload.title.trim(),
      content: payload.content.trim(),
      category: payload.category || null,
    });
    setNotes((prev) => [res.data.data, ...prev]);
    return res.data.data;
  };

  const addCategory = async (name) => {
    const res = await api.post("/notes/categories", { name: name.trim() });
    const newCat = res.data.data;
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  return {
    notes,
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
    refetch: fetchAll,
  };
}
