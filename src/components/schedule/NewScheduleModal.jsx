import { useState } from "react";
import Modal from "../ui/Modal";
import { TextInput, Textarea } from "../ui/Input";
import api from "../../services/api";

const priorities = ["low", "medium", "high"];
const priorityLabels = {
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
};

const initial = {
  title: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  priority: "medium",
};

export function NewScheduleModal({ isOpen, onClose, onSaved }) {
  const [payload, setPayload] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      await api.post("/schedule", {
        title: payload.title.trim(),
        description: payload.description.trim() || null,
        date: payload.date,
        startTime: payload.startTime,
        endTime: payload.endTime,
        priority: payload.priority,
        type: "schedule",
      });

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

        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-slate-400">Tanggal</p>

          <input
            type="date"
            name="date"
            value={payload.date}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition scheme-dark"
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
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200
                                    outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition scheme-dark"
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-400">Waktu Selesai</p>

            <input
              type="time"
              name="endTime"
              value={payload.endTime}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200
                            outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition scheme-dark"
            />
          </div>

          {/* priorities */}
          <div className="space-y-2 col-span-2">
            <p className="text-xs font-semibold text-slate-400">Tingkat Prioritas</p>
            <div className="gap-2 flex">
              {priorities.map((p) => (
                <button
                  key={p}
                  onClick={() =>
                    setPayload((prev) => ({ ...prev, priority: p }))
                  }
                  className={`flex-1 rounded-2xl mx-auto border px-4 py-2 text-xs font-medium transition cursor-pointer
                  ${
                    payload.priority === p
                      ? p === "high"
                        ? "border-red-500/80   bg-red-500/20    text-red-500"
                        : p === "medium"
                          ? "border-amber-500/80   bg-amber-500/20  text-amber-500"
                          : "border-slate-400/80  bg-slate-500/20  text-slate-500"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
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
            {loading ? "Menyimpan..." : "Simpan Jadwal"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
