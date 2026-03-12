import { useState } from "react";
import { TextInput, Textarea } from "../../../components/ui/Input";


const AddTaskForm = ({ addTodo }) => {
    // {
    // "title": "Meeting Weekly Project",
    // "description": "Sync mingguan bersama tim backend",
    // "type": "schedule",
    // "date": "2026-02-22",
    // "startTime": "09:00",
    // "endTime": "10:00",
    // "status": "pending",
    // "priority": "medium",
    // "linkUrl": "https://meet.google.com/abc-defg-hij",
    // "source": "manual"
    // }
    const [payload, setPayload] = useState(
        {
            title: "",
            description: "",
            type: "task",
            date: "",
            startTime: "",
            endTime: "",
            status: "pending",
            priority: "medium",
            linkUrl: "",
            source: "manual"
        }
    );
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload({
            ...payload,
            [name]: value
        });
    };
    return (
        <form className="p-6 flex flex-col gap-4">
            <TextInput
                type="text"
                placeholder="Judul"
                name="title"
                value={payload.title}
                onChange={handleChange}
            />
            <Textarea
                placeholder="Deskripsi"
                name="description"
                value={payload.description}
                onChange={handleChange}
            />
        </form>
    )
}
export default AddTaskForm;