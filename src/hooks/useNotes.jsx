import { useState, useMemo } from "react";
import useSWR from "swr";
import api from "../services/api";
import { createNoteList } from "../models/Note";

const fetchNotes = async () => {
  const [notesRes, catsRes] = await Promise.all([
    api.get("/notes"),
    api.get("/categories"),
  ]);
  return {
    notes: createNoteList(notesRes.data.data ?? []),
    categories: catsRes.data.data ?? [],
  };
};

export function useNotes() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data, error, isLoading, mutate } = useSWR(
    "/notes/all",
    fetchNotes
  );

  const notes = data?.notes ?? [];
  const categories = data?.categories ?? [];

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchCat =
        activeCategory === "All" || note.category?.name === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        note.title.toLowerCase().includes(q) ||
        note.content?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [notes, activeCategory, search]);

  const addNote = async (payload) => {
    const optimisticNote = {
      ...payload,
      id: `temp-${Date.now()}`,
      category: null,
      createdAt: new Date().toISOString(),
    };

    await mutate(
      async (current) => {
        const res = await api.post("/notes", {
          title: payload.title.trim(),
          content: payload.content.trim(),
          categoryId: payload.categoryId || null,
          color: payload.color || null,
          isPinned: payload.isPinned || false,
          source: "manual",
        });
        const newNote = createNoteList([res.data.data])[0];
        return { ...current, notes: [newNote, ...(current?.notes ?? [])] };
      },
      {
        optimisticData: { ...data, notes: [optimisticNote, ...notes] },
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      }
    );
  };

  const addCategory = async (name) => {
    const res = await api.post("/categories", { name: name.trim() });
    const newCat = res.data.data;
    await mutate(
      (current) => ({ ...current, categories: [...(current?.categories ?? []), newCat] }),
      { revalidate: false }
    );
    return newCat;
  };

  const deleteNote = async (id) => {
    await mutate(
      async (current) => {
        await api.delete(`/notes/${id}`);
        return {
          ...current,
          notes: (current?.notes ?? []).filter((note) => note.id !== id),
        };
      },
      {
        optimisticData: { ...data, notes: notes.filter((note) => note.id !== id) },
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      }
    );
  };

  const deleteCategory = async (id) => {
    await mutate(
      async (current) => {
        await api.delete(`/categories/${id}`);
        return {
          ...current,
          categories: (current?.categories ?? []).filter((cat) => cat.id !== id),
        };
      },
      {
        optimisticData: { ...data, categories: categories.filter((cat) => cat.id !== id) },
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      }
    );
  };

  const togglePin = async (id) => {
    await mutate(
      async (current) => {
        const res = await api.patch(`/notes/${id}/pin`);
        const updated = createNoteList([res.data.data])[0];
        return {
          ...current,
          notes: (current?.notes ?? [])
            .map((note) => (note.id === id ? updated : note))
            .sort((a, b) => b.isPinned - a.isPinned),
        };
      },
      {
        optimisticData: {
          ...data,
          notes: notes
            .map((note) => (note.id === id ? { ...note, isPinned: !note.isPinned } : note))
            .sort((a, b) => b.isPinned - a.isPinned),
        },
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      }
    );
  }
  const updateNote = async (id, payload) => {
    // optimisticData creates a temporary object by merging the payload with the existing note
    const oldNote = notes.find(n => n.id === id) || {};
    const optimisticNote = {
      ...oldNote,
      ...payload,
      category: payload.categoryId
        ? categories.find(c => c.id === payload.categoryId) || null
        : null
    };

    await mutate(
      async (current) => {
        const res = await api.put(`/notes/${id}`, {
          title: payload.title?.trim(),
          content: payload.content?.trim(),
          categoryId: payload.categoryId || null,
          color: payload.color || null,
          isPinned: payload.isPinned ?? false,
          relatedDate: payload.relatedDate || null,
        });
        const updatedNote = createNoteList([res.data.data])[0];
        return {
          ...current,
          notes: (current?.notes ?? [])
            .map((note) => (note.id === id ? updatedNote : note))
            .sort((a, b) => b.isPinned - a.isPinned),
        };
      },
      {
        optimisticData: {
          ...data,
          notes: notes
            .map((note) => (note.id === id ? optimisticNote : note))
            .sort((a, b) => b.isPinned - a.isPinned),
        },
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      }
    );
    return optimisticNote; // return optimistic data so NoteDetail can update locally instantly
  };

  return {
    notes,
    filteredNotes,
    categories,
    loading: isLoading,
    error,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    addNote,
    addCategory,
    deleteNote,
    updateNote,
    togglePin,
    deleteCategory,
    refetch: mutate,
  };
}