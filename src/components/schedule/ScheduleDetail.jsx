import { useState, useEffect } from "react";
import { ChevronLeft, Edit2, Trash2, Save, Link as LinkIcon, Calendar, Clock, AlignLeft } from "lucide-react";
import { TextInput, Textarea } from "../ui/Input";
import { formatDuration } from "../../lib/formatter";

const statuses = {
  pending: { label: "Pending", color: "text-amber-600 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20" },
  done: { label: "Done", color: "text-emerald-600 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20" },
};

const priorities = {
  low: { label: "Low", className: "text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-400 dark:bg-slate-400/10 dark:border-white/5" },
  medium: { label: "Medium", className: "text-amber-600 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20" },
  high: { label: "High", className: "text-red-600 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-400/10 dark:border-red-400/20" },
};

const fieldClass = `
  w-full border-b border-slate-200 dark:border-white/10 bg-transparent px-0 py-3 text-sm text-slate-800 dark:text-slate-200
  outline-none focus:border-indigo-500 transition placeholder:text-slate-400 dark:placeholder:text-slate-600
  scheme-light dark:scheme-dark
`;

const labelClass = "text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-1 block";

export function ScheduleDetail({ schedule, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    priority: "medium",
    status: "pending",
    linkUrl: "",
  });

  useEffect(() => {
    if (schedule) {
      setPayload({
        title: schedule.title || "",
        description: schedule.description || "",
        date: schedule.date ? schedule.date.split("T")[0] : "",
        startTime: schedule.startTime || "",
        endTime: schedule.endTime || "",
        priority: schedule.priority || "medium",
        status: schedule.status || "pending",
        linkUrl: schedule.linkUrl || "",
      });
      setError("");
      setIsEditing(false);
    }
  }, [schedule]);

  if (!schedule) return null;

  const handleChange = (e) => {
    setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setPayload(prev => ({ ...prev, status: newStatus }));
      await onUpdate(schedule.id, { ...payload, status: newStatus });
    } catch (err) {
      setPayload(prev => ({ ...prev, status: schedule.status }));
    }
  };

  const handleDelete = () => {
    onDelete(schedule.id);
    onClose();
  };

  const handleSave = async () => {
    if (!payload.title.trim()) {
      setError("Judul jadwal harus diisi");
      return;
    }
    if (!payload.date || !payload.startTime || !payload.endTime) {
      setError("Tanggal dan Waktu harus lengkap");
      return;
    }
    try {
      setLoading(true);
      await onUpdate(schedule.id, payload);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  };

  const dateObj = new Date(payload.date || schedule.date);
  const dayName = isNaN(dateObj) ? "" : dateObj.toLocaleDateString("id-ID", { weekday: "long" });
  const fullDate = isNaN(dateObj) ? "" : dateObj.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const statusData = statuses[isEditing ? payload.status : schedule.status] || statuses.pending;
  const priorityData = priorities[isEditing ? payload.priority : schedule.priority] || priorities.medium;

  return (
    <div className="w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* HEADER ACTIONS */}
      <div className="flex w-full items-center justify-between mb-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 dark:text-slate-400 font-bold hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          <ChevronLeft size={18} />
          <span className="text-sm tracking-widest mt-[0.1rem]">BACK</span>
        </button>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
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
                onClick={() => setIsEditing(true)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white transition-all duration-200 cursor-pointer"
                title="Edit Schedule"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 cursor-pointer"
                title="Delete Schedule"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        /* ── EDIT MODE ── */
        <div className="flex flex-col gap-8">
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Title */}
          <div>
            <label className={labelClass}>Judul</label>
            <input
              name="title"
              value={payload.title}
              onChange={handleChange}
              placeholder="Judul jadwal..."
              autoFocus
              className={`${fieldClass} text-xl font-bold text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700`}
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className={labelClass}>Tanggal</label>
            <input
              type="date"
              name="date"
              value={payload.date}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>

          {/* Mulai - Selesai */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className={labelClass}>Mulai</label>
              <input
                type="time"
                name="startTime"
                value={payload.startTime}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>Selesai</label>
              <input
                type="time"
                name="endTime"
                value={payload.endTime}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
          </div>

          {/* Tingkat Prioritas */}
          <div>
            <label className={labelClass}>Tingkat Prioritas</label>
            <div className="flex gap-3 mt-2">
              {Object.keys(priorities).map((p) => (
                <button
                  key={p}
                  onClick={() => setPayload({ ...payload, priority: p })}
                  className={`flex-1 border-b-2 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer
                    ${payload.priority === p
                      ? `${priorities[p].className} border-current`
                      : "border-slate-200 dark:border-white/10 bg-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                    }`}
                >
                  {priorities[p].label}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>Status</label>
            <div className="flex gap-3 mt-2">
              {Object.keys(statuses).map((s) => (
                <button
                  key={s}
                  onClick={() => setPayload({ ...payload, status: s })}
                  className={`flex-1 border-b-2 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer
                    ${payload.status === s
                      ? `${statuses[s].color} border-current`
                      : "border-slate-200 dark:border-white/10 bg-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                    }`}
                >
                  {statuses[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Link Rapat */}
          <div>
            <label className={labelClass}>Link Rapat / Referensi</label>
            <input
              type="url"
              name="linkUrl"
              value={payload.linkUrl}
              onChange={handleChange}
              placeholder="https://..."
              className={fieldClass}
            />
          </div>

          {/* Catatan */}
          <div>
            <label className={labelClass}>Catatan</label>
            <textarea
              name="description"
              value={payload.description}
              onChange={handleChange}
              placeholder="Tulis catatan jadwal..."
              rows={6}
              className={`${fieldClass} resize-none border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 mt-1 border-b`}
            />
          </div>
        </div>
      ) : (
        /* ── VIEW MODE ── */
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-2.5 py-1 rounded-lg border font-bold text-xs uppercase tracking-wider ${statusData.color}`}>
              {statusData.label}
            </span>
            <span className={`px-2.5 py-1 rounded-lg border font-bold text-xs uppercase tracking-wider ${priorityData.className}`}>
              {priorityData.label} Priority
            </span>
          </div>

          <h1 className="text-3xl font-black text-slate-800 dark:text-white leading-tight">
            {schedule.title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-2">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-white/5">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-0.5">{dayName}</p>
                <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{fullDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-amber-600 dark:text-amber-500 border border-slate-200 dark:border-white/5">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-0.5">
                  {formatDuration(schedule.startTime, schedule.endTime)}
                </p>
                <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{schedule.startTime} — {schedule.endTime}</p>
              </div>
            </div>
          </div>

          {schedule.linkUrl && (
            <a
              href={schedule.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-4 mt-2 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 transition-colors w-full sm:w-fit"
            >
              <LinkIcon size={18} />
              <span className="font-semibold text-sm truncate max-w-[200px] sm:max-w-xs">{schedule.linkUrl}</span>
            </a>
          )}

          <div className="h-px bg-slate-200 dark:bg-white/5 w-full my-2" />

          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] flex items-center gap-1.5 uppercase">
              <AlignLeft size={14} /> Catatan / Deskripsi
            </span>
            {schedule.description ? (
              <div className="text-slate-700 dark:text-slate-300 min-h-[150px] leading-relaxed whitespace-pre-wrap text-sm">
                {schedule.description}
              </div>
            ) : (
              <p className="text-slate-400 dark:text-slate-500 text-sm italic">Tidak ada catatan ditambahkan.</p>
            )}
          </div>

          {/* FAST STATUS CHANGER */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
            <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-4 text-center">Ganti Status Cepat</p>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.keys(statuses).map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition cursor-pointer border
                    ${schedule.status === s
                      ? statuses[s].color + " cursor-default opacity-50"
                      : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white"}`}
                  disabled={schedule.status === s}
                >
                  Set {statuses[s].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}