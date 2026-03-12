import { MagicButton } from "../../../components/ui/MagicButton"
import { LucidePlus } from "lucide-react"
const TaskHeader = () => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold dark:text-white text-gray-900">
                    Tugas
                </h1>
                <p className="font-medium text-slate-600 dark:text-white/40">
                    Ingat aktivitas harianmu!
                </p>
            </div>
            <MagicButton variant="primary">
                <LucidePlus size={16} />
                Tambah Tugas
            </MagicButton>
        </div>
    )
}
export default TaskHeader;