import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    AlertTriangle, Calendar, CheckSquare, Clock,
    RefreshCw, FileText, Check, X, Stars
} from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { MagicButton } from "../ui/MagicButton";
import { TextInput, TimeInput } from "../ui/Input";

function RecurrenceBadge({ recurrence }) {
    if (!recurrence) return null;
    let label = "Berulang";
    if (recurrence.frequency === "daily") label = "Setiap hari";
    else if (recurrence.frequency === "weekly") {
        label = recurrence.dayOfWeek ? `Setiap ${recurrence.dayOfWeek}` : "Setiap minggu";
    } else if (recurrence.frequency === "monthly") {
        label = "Setiap bulan";
    }

    return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 shrink-0">
            <RefreshCw size={10} className="shrink-0" />
            {label}
        </span>
    );
}

function PriorityBadge({ priority }) {
    if (!priority) return null;
    const p = priority.toLowerCase();
    let style = "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300";
    let label = "Rendah";
    if (p === "high") {
        style = "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30";
        label = "Tinggi";
    } else if (p === "medium") {
        style = "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30";
        label = "Sedang";
    } else {
        style = "bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300 border border-gray-200 dark:border-gray-500/30";
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold ${style} shrink-0`}>
            {label}
        </span>
    );
}

function ItemCard({ children, className = "" }) {
    return (
        <div className={`p-3 sm:p-4 rounded-xl border border-indigo-100 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm ${className}`}>
            {children}
        </div>
    );
}

export default function ParsePreviewCard({
    data,
    onConfirm,
    onDismiss,
    isLoading
}) {
    // Keep local editable state for activities and notes
    const [editableActivities, setEditableActivities] = useState([]);
    const [editableNotes, setEditableNotes] = useState([]);

    useEffect(() => {
        if (data) {
            setEditableActivities(data.activities || []);
            setEditableNotes(data.notes || []);
        }
    }, [data]);

    if (!data) return null;
    const { warnings = [] } = data;

    const hasWarnings = warnings.length > 0;
    const hasActivities = editableActivities.length > 0;
    const hasNotes = editableNotes.length > 0;

    const handleActivityChange = (index, field, value) => {
        const newActivities = [...editableActivities];
        newActivities[index] = { ...newActivities[index], [field]: value };
        setEditableActivities(newActivities);
    };

    const handleNoteChange = (index, field, value) => {
        const newNotes = [...editableNotes];
        newNotes[index] = { ...newNotes[index], [field]: value };
        setEditableNotes(newNotes);
    };

    const handleSave = () => {
        onConfirm({
            ...data,
            activities: editableActivities,
            notes: editableNotes
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="w-full max-w-lg mb-4 mt-2 self-start"
        >
            <GlassCard className="p-4 sm:p-5 flex flex-col gap-4 border-indigo-200 dark:border-indigo-500/30 shadow-indigo-500/10">

                {/* Header Title */}
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
                    <Stars size={16} className="text-indigo-500 dark:text-indigo-400" />
                    Preview Data AI
                </h3>

                {/* Warnings Banner */}
                {hasWarnings && (
                    <div className="flex flex-col gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50">
                        {warnings.map((warn, i) => (
                            <div key={i} className="flex gap-2 text-amber-800 dark:text-amber-200 text-xs sm:text-sm items-start">
                                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{warn}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto no-scrollbar pr-1">
                    {/* Activities Section */}
                    {hasActivities && (
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">Aktivitas & Tugas (Bisa diedit)</h4>
                            {editableActivities.map((act, i) => {
                                const isSchedule = act.type === "schedule";
                                const bgBadge = isSchedule ? "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30" : "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30";
                                const icon = isSchedule ? <Calendar size={12} /> : <CheckSquare size={12} />;

                                return (
                                    <ItemCard key={i} className="flex flex-col gap-2 group transition-all">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                                <TextInput
                                                    value={act.title || ""}
                                                    onChange={(e) => handleActivityChange(i, "title", e.target.value)}
                                                    className="!text-sm !font-bold !text-gray-800 dark:!text-white/90 !p-0 !border-b-transparent hover:!border-b-indigo-300 dark:hover:!border-b-indigo-500/50 focus:!border-b-indigo-500 transition-colors"
                                                    placeholder="Judul Aktivitas"
                                                />
                                            </div>
                                            <PriorityBadge priority={act.priority} />
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold border ${bgBadge}`}>
                                                {icon}
                                                {isSchedule ? "Jadwal" : "Tugas"}
                                            </span>

                                            <TextInput
                                                type="date"
                                                value={act.date || ""}
                                                onChange={(e) => handleActivityChange(i, "date", e.target.value)}
                                                className="!text-xs !font-medium !text-gray-600 dark:!text-white/60 !p-0 !w-auto !border-b-transparent hover:!border-b-indigo-300 focus:!border-b-indigo-500"
                                            />

                                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-white/50">
                                                <Clock size={12} className="shrink-0" />
                                                <TimeInput
                                                    type="time"
                                                    value={act.startTime || ""}
                                                    onChange={(e) => handleActivityChange(i, "startTime", e.target.value)}
                                                    className="!text-xs !p-0 !min-w-[4rem] !w-auto !border-b-transparent hover:!border-b-indigo-300 focus:!border-b-indigo-500 inline-block"
                                                />
                                                <span>-</span>
                                                <TimeInput
                                                    type="time"
                                                    value={act.endTime || ""}
                                                    onChange={(e) => handleActivityChange(i, "endTime", e.target.value)}
                                                    className="!text-xs !p-0 !min-w-[4rem] !w-auto !border-b-transparent hover:!border-b-indigo-300 focus:!border-b-indigo-500 inline-block"
                                                />
                                            </div>
                                            <RecurrenceBadge recurrence={act.recurrence} />
                                        </div>
                                    </ItemCard>
                                );
                            })}
                        </div>
                    )}

                    {/* Notes Section */}
                    {hasNotes && (
                        <div className="flex flex-col gap-2 mt-2">
                            <h4 className="text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">Catatan (Bisa diedit)</h4>
                            {editableNotes.map((note, i) => (
                                <ItemCard key={i} className="flex flex-col gap-1.5 group">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5 flex-1">
                                            <FileText size={14} className="text-indigo-400 shrink-0" />
                                            <TextInput
                                                value={note.title || ""}
                                                onChange={(e) => handleNoteChange(i, "title", e.target.value)}
                                                className="!text-sm !font-bold !text-gray-800 dark:!text-white/90 !p-0 !border-b-transparent hover:!border-b-indigo-300 focus:!border-b-indigo-500"
                                                placeholder="Judul Catatan"
                                            />
                                        </div>
                                        {note.relatedDate !== undefined && (
                                            <TextInput
                                                type="date"
                                                value={note.relatedDate || ""}
                                                onChange={(e) => handleNoteChange(i, "relatedDate", e.target.value)}
                                                className="!text-xs !text-gray-500 dark:!text-white/50 bg-gray-100 dark:bg-white/10 !px-2 !py-0.5 rounded-md !w-auto !border-b-transparent hover:!border-b-indigo-300 focus:!border-b-indigo-500"
                                            />
                                        )}
                                    </div>
                                    <textarea
                                        value={note.content || ""}
                                        onChange={(e) => handleNoteChange(i, "content", e.target.value)}
                                        className="text-xs text-gray-600 dark:text-white/70 leading-relaxed w-full bg-transparent border-b border-transparent hover:border-indigo-300 focus:border-indigo-500 outline-none resize-none overflow-hidden"
                                        rows={Math.max(2, (note.content || "").split('\n').length)}
                                        placeholder="Isi catatan..."
                                    />
                                </ItemCard>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-indigo-100 dark:border-white/10">
                    <MagicButton
                        variant="ghost"
                        size="sm"
                        onClick={onDismiss}
                        disabled={isLoading}
                        className="!px-3"
                    >
                        <X size={14} /> Batal
                    </MagicButton>
                    <MagicButton
                        variant="primary"
                        size="sm"
                        onClick={handleSave}
                        disabled={isLoading}
                        className="!px-4 bg-indigo-600 hover:bg-indigo-700"
                    >
                        {isLoading ? (
                            <RefreshCw size={14} className="animate-spin" />
                        ) : (
                            <Check size={14} />
                        )}
                        Simpan
                    </MagicButton>
                </div>
            </GlassCard>
        </motion.div>
    );
}
