import { useState } from "react";
import { TextInput, Textarea, TimeInput } from "../../../components/ui/Input";
import { Calendar1, LucideFlag, LucideMenu } from "lucide-react";
import { MagicButton } from "../../../components/ui/MagicButton";

const PRIORITIES = [
    { value: "low", label: "Low", color: "dark:bg-green-500/20 bg-green-500/60" },
    { value: "medium", label: "Medium", color: "dark:bg-yellow-500/20 bg-yellow-500/60" },
    { value: "high", label: "High", color: "dark:bg-red-500/20 bg-red-500/60" },
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
                <div className="flex items-center text-xs font-semibold gap-1 text-slate-500">
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
                <div className="flex items-center text-xs font-semibold gap-1 text-slate-500">
                    <LucideFlag size={12} />
                    <h6>PRIORITY</h6>
                </div>
                <div className="flex items-center gap-2">
                    {PRIORITIES.map((priority) => (
                        <button
                            key={priority.value}
                            type="button"
                            onClick={() => handlePriority(priority.value)}
                            className={`rounded-md w-full border border-white/10 px-4 py-2 text-xs dark:text-slate-300 text-white transition duration-300 hover:text-white cursor-pointer ${payload.priority === priority.value
                                ? priority.color
                                : "dark:bg-white/5 bg-slate-400/60"
                                }`}
                        >
                            {priority.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center text-xs font-semibold gap-1 text-slate-500">
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