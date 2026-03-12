import TodoCard from "../../../components/ui/TodoCard";
const MainTaskSection = ({ tasks = [], onToggle, onDelete, isFiltering }) => {
    const handleClick = (task) => {
        console.log("open:", task);
    };

    return (
        <div className="w-full flex flex-col gap-2">
            {tasks.map((task) => (
                <TodoCard
                    key={task.id}
                    task={task}
                    onToggle={() => onToggle(task.id)}
                    onDelete={() => onDelete(task.id)}
                    onClick={() => handleClick(task)}
                />
            ))}

            {tasks.length === 0 && (
                <p className="text-center text-sm text-slate-400 dark:text-white/30 py-8">
                    {isFiltering
                        ? "Tidak ada tugas yang cocok dengan filter."
                        : "Tidak ada tugas untuk ditampilkan."}
                </p>
            )}
        </div>
    );
};

export default MainTaskSection;