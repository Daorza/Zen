import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { TextInput, Textarea } from "../ui/Input";

const priorities = ["low", "medium", "high"];
const priorityLabels = {
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
};
const prioriryActive = {
  low: "border-slate-400 bg-slate-500 text-white",
  medium: "border-amber-400 bg-amber-500 text-white",
  high: "border-red-400 bg-red-500 text-white",
};

const initial = {
  title: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  priority: "medium",
  linkUrl: "",
};

export function NewScheduleModal({ isOpen, onClose, onSaved, addSchedule, selectedDate = new Date() }) {
  const [payload, setPayload] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && selectedDate) {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const dd = String(selectedDate.getDate()).padStart(2, "0");
      setPayload(prev => ({ ...prev, date: `${yyyy}-${mm}-${dd}` }));
    }
  }, [isOpen, selectedDate]);

  const handleChange = (e) => {
    setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!payload.title.trim()) {
      setError("Judul jadwal harus diisi");
      return;
    }

    if (!payload.date) {
      setError("Tanggal harus diisi");
      return;
    }

    if (!payload.startTime) {
      setError("Waktu mulai harus diisi");
      return;
    }

    if (!payload.endTime) {
      setError("Waktu selesai harus diisi");
      return;
    }

    if (payload.startTime >= payload.endTime) {
      setError("Waktu selesai harus lebih besar dari waktu mulai");
      return;
    }

    try {
      setLoading(true);
      await addSchedule(payload);
      setPayload(initial);
      onSaved();
    } catch (error) {
      setError(
        error?.response?.data?.message ??
          "Terjadi kesalahan saat menyimpan jadwal.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPayload(initial);
    setError("");
    onClose();
  };

  const timeInputClass = `
    w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200
    outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition
    scheme-light dark:scheme-dark
  `;

  return (
    <Modal title="Jadwal Baru" isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6 p-6">
        <TextInput
          placeholder="Judul"
          name="title"
          value={payload.title}
          onChange={handleChange}
          autoFocus
        />

        <Textarea
          placeholder="Deskripsi (opsional)"
          name="description"
          value={payload.description}
          onChange={handleChange}
        />

        <TextInput
          placeholder="Link Rapat / Dokumen (opsional)"
          name="linkUrl"
          type="url"
          value={payload.linkUrl}
          onChange={handleChange}
        />

        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-slate-400">TANGGAL</p>
          <input
            type="date"
            name="date"
            value={payload.date}
            onChange={handleChange}
            className={timeInputClass}
          />
        </div>

        {/* start n end time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400">Waktu Mulai</p>

            <input
              type="time"
              name="startTime"
              value={payload.startTime}
              onChange={handleChange}
              className={timeInputClass}
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-400">
              Waktu Selesai
            </p>

            <input
              type="time"
              name="endTime"
              value={payload.endTime}
              onChange={handleChange}
              className={timeInputClass}
            />
          </div>

          {/* priorities */}
          <div className="space-y-2 col-span-2">
            <p className="text-xs font-semibold text-slate-400">
              Tingkat Prioritas
            </p>
            <div className="gap-2 flex">
              {priorities.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    setPayload((prev) => ({ ...prev, priority: p }))
                  }
                  className={`flex-1 rounded-2xl mx-auto border px-4 py-2 text-xs font-medium transition cursor-pointer
                  ${
                    payload.priority === p
                      ? prioriryActive[p]
                      : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                  }`}
                >
                  {priorityLabels[p]}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 border-t border-slate-200 dark:border-white/10 p-6">
          <button
            onClick={handleClose}
            className="rounded-2xl bg-slate-200 dark:bg-white/10 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Menyimpan..." : "Simpan Jadwal"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
