import { useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MagicButton } from "../ui/MagicButton";
import Modal from "../ui/Modal";
import { TextInput, Textarea } from "../ui/Input";

const initial = {
  title: "",
  content: "",
  category: "",
};

function AddCategoryModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Kategori harus diisi");
      return;
    }

    try {
      setLoading(true);
      await onAdd(trimmed);
      setName("");
      setError("");
      onClose();
    } catch (error) {
      setError(error?.response?.data?.message ?? "Gagal menambah kategori");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setError("");
    onClose();
  };

  return (
    <Modal title="Kategori Baru" isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-4 p-6">
        <TextInput
          placeholder="Nama kategori"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
        />
        
        {error && <p className="text-xs text-red-400">
          {error}
          </p>}
      </div>

      <div className="flex justify-end gap-3 border-t border-white/10 p-6">
        <button
          onClick={handleClose}
          className="rounded-2xl bg-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/20 cursor-pointer"
        >
          Batal
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </Modal>
  );
}

export function NewNoteModal({
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

  const handleSelectCategory = (name) => {
    setPayload((prev) => ({ ...prev, category: name === name ? "" : name }));
  }
  
  const handleCategoryAdded = async (name) => {
    await addCategory(name);
    setPayload((prev) => ({ ...prev, category: name }));
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
        <TextInput 
          placeholder="Judul"
          name="title"
          value={payload.title}
          onChange={handleChange}
          autoFocus
        />

        <Textarea 
          placeholder="Deskripsi"
          name="content"
          value={payload.content}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400">Kategori</p>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat, index) => {
            const catName = cat?.name ?? cat;
            const isActive = payload.category === catName;
            
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectCategory(catName)}
                className={`rounded-2xl border px-4 py-2 text-xs transition cursor-pointer
                  ${isActive
                    ? "border-indigo-500 bg-indigo-500/50 text-white"
                    : "border-white/10 bg-white/5 text-slate-300 hover:bg-indigo-500 hover:text-white"
                  }
                `}
              >
                {catName}
              </button>
            );
          })}

          <MagicButton 
            onClick={() => setAddCatOpen(true) }
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

      <div className="flex justify-end gap-4 border-t border-white/10 p-6">
        <button
          onClick={handleClose}
          className="rounded-2xl bg-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/20 cursor-pointer"
        >
          Batal
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Menyimpan..." : "Simpan Catatan"}
        </button>
      </div>

    </Modal>
    </>
  );
}
