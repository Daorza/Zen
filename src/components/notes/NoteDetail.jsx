import { useState, useEffect } from "react";
import { ChevronLeft, Pin, Edit2, Trash2, Save, X, LucideBadgeInfo, LucideInfo } from "lucide-react";
import { TextInput, Textarea } from "../ui/Input";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#64748b",
];

function formatDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function extractDateOnly(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return "";
  return date.toISOString().split("T")[0];
}

export function NoteDetail({ note, onClose, onUpdate, togglePin, deleteNote, categories }) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState({
    title: "",
    content: "",
    categoryId: null,
    color: null,
    relatedDate: "",
    isPinned: false
  });

  useEffect(() => {
    if (note) {
      setPayload({
        title: note.title || "",
        content: note.content || "",
        categoryId: note.categoryId || null,
        color: note.color || null,
        relatedDate: extractDateOnly(note.relatedDate),
        isPinned: note.isPinned || false
      });
      setError("");
      setIsEditing(false);
    }
  }, [note]);

  if (!note) return null;

  const handleChange = (e) => {
    setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleColor = (color) => {
    setPayload((prev) => ({ ...prev, color: color === prev.color ? null : color }));
  };

  const handleSelectCategory = (id) => {
    setPayload((prev) => ({ ...prev, categoryId: id === prev.categoryId ? null : id }));
  };

  const handlePinToggle = () => {
    if (isEditing) {
      setPayload((prev) => ({ ...prev, isPinned: !prev.isPinned }));
    } else {
      togglePin(note.id);
    }
  };

  const handleDelete = () => {
    deleteNote(note.id);
    onClose();
  };

  const handleSave = async () => {
    if (!payload.title.trim()) {
      setError("Judul catatan harus diisi");
      return;
    }
    try {
      setLoading(true);
      await onUpdate(note.id, payload);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      {/* HEADER ACTIONS */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          <ChevronLeft size={18} />
          <span className="text-sm tracking-widest mt-[0.1rem]">BACK</span>
        </button>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs tracking-widest hover:bg-slate-200 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                disabled={loading || !payload.title.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs tracking-widest transition-colors cursor-pointer disabled:opacity-50"
              >
                <Save size={16} />
                {loading ? "SAVING..." : "SAVE"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handlePinToggle}
                className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${note.isPinned
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                  }`}
                title={note.isPinned ? "Unpin Note" : "Pin Note"}
              >
                <Pin size={18} className={note.isPinned ? "fill-indigo-400" : ""} />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2.5 rounded-xl bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-200 cursor-pointer"
                title="Edit Note"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2.5 rounded-xl bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 cursor-pointer"
                title="Delete Note"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="relative w-full max-w-4xl p-8 sm:p-12 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 overflow-hidden shadow-xl">
        {/* Subtle top reflection overlay */}
        <div className="absolute inset-0 top-0 left-0 bg-gradient-to-br from-white/40 dark:from-white-[0.03] to-transparent h-40 pointer-events-none" />

        {/* Color accent if applied */}
        {(isEditing ? payload.color : note.color) && (
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: isEditing ? payload.color : note.color }}
          />
        )}

        <div className="relative z-10 flex flex-col gap-8">
          {isEditing ? (
            /* EDIT MODE */
            <>
              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-2 items-center">
                <div className="space-y-2 w-full">
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] flex items-center gap-1.5">
                    <LucideInfo size={16} />
                    TITLE
                  </span>
                  <TextInput
                    name="title"
                    value={payload.title}
                    onChange={handleChange}
                    placeholder="Note title..."
                    className="text-2xl font-bold bg-transparent border-none p-0 !pl-0 focus:ring-0 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 h-10"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={handlePinToggle}
                  className={`flex items-center justify-center gap-2 shrink h-12 w-12 rounded-xl border mt-2 transition-all cursor-pointer ${payload.isPinned
                    ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400"
                    : "bg-slate-100 dark:bg-white/5 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                  <Pin size={16} className={payload.isPinned ? "fill-indigo-400" : ""} />
                  <span className="text-xs font-bold tracking-widest">{payload.isPinned ? "PINNED" : "PIN"}</span>
                </button>
              </div>



              <div className="h-px bg-slate-200 dark:bg-white/5 w-full" />

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] flex items-center gap-1.5">
                  <span className="w-3 h-2.5 border-y-2 border-slate-500" />
                  CONTENT
                </span>
                <Textarea
                  name="content"
                  value={payload.content}
                  onChange={handleChange}
                  placeholder="Start writing..."
                  className="bg-transparent border border-slate-200 dark:border-white/5 focus:border-slate-300 dark:focus:border-white/10 p-6 min-h-[350px] text-slate-700 dark:text-slate-300 resize-y rounded-2xl"
                />
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/5 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {/* date picker */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] flex items-center gap-1.5 uppercase">
                    Related Date
                  </span>
                  <TextInput
                    type="date"
                    name="relatedDate"
                    value={payload.relatedDate}
                    onChange={handleChange}
                    className="bg-slate-50 dark:bg-white/5 border-transparent h-12 rounded-xl"
                  />
                </div>
                {/* Color Selection */}
                <div className="gap-4 flex flex-col h-full">
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Color Theme</span>
                  <div className="flex items-center gap-2 grow">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleColor(color)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform duration-150 cursor-pointer hover:scale-110
                            ${payload.color === color ? "border-white scale-110" : "border-transparent"}
                          `}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    {payload.color && (
                      <button
                        type="button"
                        onClick={() => handleColor(payload.color)}
                        className="text-xs text-slate-500 hover:text-slate-300 ml-2 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
                {/* Category Selection */}
                <div className="flex flex-col gap-4 col-span-1 sm:col-span-2">
                  <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Category</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const isActive = payload.categoryId === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSelectCategory(cat.id)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer
                                ${isActive
                              ? "border-indigo-500 bg-indigo-500/20 text-indigo-600 dark:text-indigo-300"
                              : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-200 dark:border-white/5 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10"
                            }
                              `}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </>
          ) : (
            /* VIEW MODE */
            <>
              <div className="space-y-6">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                  {note.title}
                </h1>

                <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-slate-500">
                  {note.createdAt && (
                    <span className="flex items-center gap-1.5">
                      <span className="size-[14px] rounded-full border-2 border-slate-500 flex items-center justify-center text-[8px]">L</span>
                      {formatDate(note.createdAt)}
                    </span>
                  )}
                  {note.source && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-[4px] h-[4px] bg-slate-500 rounded-full" />
                      SOURCE: {note.source}
                    </span>
                  )}
                  {note.category && (
                    <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                      <span className="w-[4px] h-[4px] bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                      {note.category?.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/5 w-full my-2" />

              <div className="text-slate-700 dark:text-slate-300 min-h-[300px] leading-relaxed whitespace-pre-wrap text-base">
                {note.content}
              </div>

              {note.relatedDate && (
                <>
                  <div className="h-px bg-slate-200 dark:bg-white/5 w-full my-2" />
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Related Date</span>
                    <span className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <span className="border rounded border-slate-500 px-1 py-0.5 text-[10px]">12</span>
                      {formatDate(note.relatedDate)}
                    </span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
