import { useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Pin } from "lucide-react";
import { MagicButton } from "../ui/MagicButton";
import Modal from "../ui/Modal";
import { TextInput, Textarea } from "../ui/Input";
import { AddCategoryModal } from "./AddCategoryModal";

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

const initial = {
  title: "",
  content: "",
  categoryId: null,
  source: "manual",
  color: null,
  isPinned: false,
};

export function AddNoteModal({
  isOpen, onClose, onSaved, categories = [], addNote, addCategory
}) {

  const [payload, setPayload] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addCatOpen, setAddCatOpen] = useState(false);

  const handleChange = (e) => {
    setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  const handleSelectCategory = (id) => {
    setPayload((prev) => ({ ...prev, categoryId: id === prev.categoryId ? null : id }));
  }

  const handleColor = (color) => {
    setPayload((prev) => ({ ...prev, color: color === prev.color ? null : color }));
  };

  const handlePin = () => {
    setPayload((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  };

  const handleCategoryAdded = async (name) => {
    const newCat = await addCategory(name);
    setPayload((prev) => ({ ...prev, categoryId: newCat.id }));
  }

  const handleSubmit = async () => {
    if (!payload.title.trim()) {
      setError("Judul catatan harus diisi");
      return;
    }

    try {
      setLoading(true);
      await addNote(payload);
      setPayload(initial);
      onSaved();
    } catch (error) {
      setError(error?.response?.data?.message ?? "Gagal menyimpan catatan.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPayload(initial);
    setError("");
    onClose();
  };

  return (
    <>
      <AddCategoryModal
        isOpen={addCatOpen}
        onClose={() => setAddCatOpen(false)}
        onAdd={handleCategoryAdded}
      />

      <Modal
        title="Catatan Baru"
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className="space-y-6 p-6">

          {/* Title + Pin button */}
          <div className="flex items-center gap-2">
            <TextInput
              placeholder="Judul"
              name="title"
              value={payload.title}
              onChange={handleChange}
              autoFocus
            />
            <button
              type="button"
              onClick={handlePin}
              title={payload.isPinned ? "Unpin" : "Pin"}
              className={`shrink-0 p-2 rounded-lg border transition-colors duration-200 cursor-pointer
                ${payload.isPinned
                  ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-400"
                  : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-indigo-500 hover:border-indigo-500/40 dark:hover:text-indigo-400 dark:hover:border-indigo-500/50"
                }`}
            >
              <Pin size={16} className={payload.isPinned ? "fill-indigo-400" : ""} />
            </button>
          </div>

          <Textarea
            placeholder="Deskripsi"
            name="content"
            value={payload.content}
            onChange={handleChange}
          />

          {/* Color picker */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400">Warna</p>
            <div className="flex items-center gap-2 flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColor(color)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform duration-150 cursor-pointer hover:scale-110
                    ${payload.color === color
                      ? "border-white scale-110"
                      : "border-transparent"
                    }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {payload.color && (
                <button
                  type="button"
                  onClick={() => handleColor(payload.color)}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400">Kategori</p>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = payload.categoryId === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`rounded-2xl border px-4 py-2 text-xs transition cursor-pointer
                  ${isActive
                        ? "border-indigo-500 bg-indigo-500/50 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-indigo-500 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      }
                `}
                  >
                    {cat.name}
                  </button>
                );
              })}

              <MagicButton
                onClick={() => setAddCatOpen(true)}
                className="flex items-center gap-2"
              >
                <PlusIcon className="size-4" />
                Tambah
              </MagicButton>
            </div>
          </div>

          {error &&
            <p className="text-xs text-red-400">
              {error}
            </p>
          }
        </div>

        <div className="flex justify-end gap-4 border-t border-slate-200 dark:border-white/10 p-6">
          <button
            onClick={handleClose}
            className="rounded-2xl bg-slate-200 dark:bg-white/10 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 cursor-pointer"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || !payload.title.trim() || !payload.content.trim()}
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Menyimpan..." : "Simpan Catatan"}
          </button>
        </div>

      </Modal>
    </>
  );
}