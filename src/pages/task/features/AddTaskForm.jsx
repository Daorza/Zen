import { useState } from "react";
import { TextInput, Textarea, TimeInput } from "../../../components/ui/Input";
import { Calendar1, LucideFlag, LucideMenu } from "lucide-react";
import { MagicButton } from "../../../components/ui/MagicButton";

const PRIORITIES = [
    { value: "low", label: "Low", color: "bg-green-100 border-green-200 text-green-700 dark:bg-green-500/20 dark:border-green-500/30 dark:text-green-400" },
    { value: "medium", label: "Medium", color: "bg-amber-100 border-amber-200 text-amber-700 dark:bg-yellow-500/20 dark:border-yellow-500/30 dark:text-yellow-400" },
    { value: "high", label: "High", color: "bg-red-100 border-red-200 text-red-700 dark:bg-red-500/20 dark:border-red-500/30 dark:text-red-400" },
];

const INITIAL_PAYLOAD = {
    title: "",
    description: "",
    type: "task",
    date: "",
    startTime: "",
    endTime: "",
    status: "pending",
    priority: "medium",
    linkUrl: "",
    source: "manual",
};

const AddTaskForm = ({ addTodo, setAddModalOpen }) => {
    const [payload, setPayload] = useState(INITIAL_PAYLOAD);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload((prev) => ({ ...prev, [name]: value }));
    };

    const handlePriority = (value) => {
        setPayload((prev) => ({ ...prev, priority: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!payload.title.trim()) return;
        addTodo(payload);
        setPayload(INITIAL_PAYLOAD);
        setAddModalOpen(false)
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            <TextInput
                type="text"
                placeholder="Judul"
                name="title"
                value={payload.title}
                onChange={handleChange}
                className={"font-bold"}
            />
            <div className="space-y-2">
                <div className="flex items-center text-xs font-semibold gap-1 text-slate-600 dark:text-slate-500">
                    <LucideMenu size={12} />
                    <h6>DESCRIPTION</h6>
                </div>
                <Textarea
                    placeholder="Deskripsi"
                    name="description"
                    value={payload.description}
                    onChange={handleChange}
                />
            </div>
            <div className="space-y-2">
                <div className="flex items-center text-xs font-semibold gap-1 text-slate-600 dark:text-slate-500">
                    <LucideFlag size={12} />
                    <h6>PRIORITY</h6>
                </div>
                <div className="flex items-center gap-2">
                    {PRIORITIES.map((priority) => (
                        <button
                            key={priority.value}
                            type="button"
                            onClick={() => handlePriority(priority.value)}
                            className={`rounded-md w-full border px-4 py-2 text-xs font-semibold transition duration-300 cursor-pointer ${payload.priority === priority.value
                                ? priority.color
                                : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200 dark:bg-white/5 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                                }`}
                        >
                            {priority.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center text-xs font-semibold gap-1 text-slate-600 dark:text-slate-500">
                    <Calendar1 size={12} />
                    <h6>DATE & TIME</h6>
                </div>
                <div className="flex items-center gap-2">
                    <TimeInput
                        type="date"
                        placeholder="Start Time"
                        name="date"
                        value={payload.date}
                        onChange={handleChange}
                    />
                    <TimeInput
                        type="time"
                        placeholder="Start Time"
                        name="startTime"
                        value={payload.startTime}
                        onChange={handleChange}
                    />
                    <TimeInput
                        type="time"
                        placeholder="End Time"
                        name="endTime"
                        value={payload.endTime}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <MagicButton
                type="submit"
                disabled={!payload.title.trim()}
            >
                Tambah Task
            </MagicButton>
        </form>
    );
};

export default AddTaskForm;