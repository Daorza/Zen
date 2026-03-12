import { useMemo } from "react"
import GlassCard from "../../../components/ui/GlassCard"
import ProgressBar from "../../../components/ui/Progressbar"

const MOTIVASI = [
    { max: 0, text: "Yuk mulai hari ini, satu langkah kecil sudah berarti! 💪" },
    { max: 30, text: "Awal yang bagus, terus pertahankan!" },
    { max: 60, text: "Sudah separuh jalan, jangan berhenti sekarang!" },
    { max: 80, text: "Kamu sudah hampir selesai, tetap semangat!" },
    { max: 99, text: "Sedikit lagi, finish strong! 🔥" },
    { max: 100, text: "Semua tugas selesai, luar biasa! 🎉" },
];

function getMotivasi(current, total) {
    if (total === 0) return MOTIVASI[0].text;
    const pct = (current / total) * 100;
    return MOTIVASI.find((m) => pct <= m.max)?.text ?? MOTIVASI.at(-1).text;
}

const TaskProgress = ({ todos = [] }) => {
    const { current, total } = useMemo(() => {
        const total = todos.length;
        const current = todos.filter((t) => t.status === "done").length;
        return { current, total };
    }, [todos]);

    return (
        <GlassCard className="p-4 rounded-xl!">
            <div className="flex flex-col gap-4">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-lg font-bold dark:text-white text-gray-900">
                        Progres Tugas
                    </h2>
                    <p className="font-medium text-slate-600 dark:text-white/40">
                        {current}/{total}
                    </p>
                </div>
                <ProgressBar current={current} total={total} />
                <p className="font-medium text-slate-600 dark:text-white/40">
                    {getMotivasi(current, total)}
                </p>
            </div>
        </GlassCard>
    );
};

export default TaskProgress;