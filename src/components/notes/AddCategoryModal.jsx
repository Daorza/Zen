import { useState } from "react";
import Modal from "../ui/Modal";
import { TextInput } from "../ui/Input";

export function AddCategoryModal({ isOpen, onClose, onAdd }) {
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
    <Modal title="Kategori Baru" isOpen={isOpen} onClose={handleClose} className={'z-[999]'}>
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

      <div className="flex justify-end gap-3 border-t border-slate-200 dark:border-white/10 p-6">
        <button
          onClick={handleClose}
          className="rounded-2xl bg-slate-200 dark:bg-white/10 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 cursor-pointer"
        >
          Batal
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading || !name.trim()}
          className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </Modal>
  );
}
