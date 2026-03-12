import { useEffect, useState, useMemo } from "react";
import activityService from "../services/app/activityService";

export function useTodos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        priority: "All",
        status: "All",
        time: "Semua",
    });

    useEffect(() => {
        activityService.getAll()
            .then(setTodos)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    const toggleTodo = async (id) => {
        const prev = todos;
        setTodos(prev.map(todo =>
            todo.id === id
                ? { ...todo, status: todo.status === "pending" ? "done" : "pending" }
                : todo
        ));
        try {
            await activityService.toggle(id);
        } catch (err) {
            setTodos(prev);
            setError(err);
        }
    };

    const deleteTodo = async (id) => {
        const prev = todos;
        setTodos(prev.filter(todo => todo.id !== id));
        try {
            await activityService.remove(id);
        } catch (err) {
            setTodos(prev);
            setError(err);
        }
    };

    const isFiltering = useMemo(() => {
        return (
            search.trim() !== "" ||
            filters.priority !== "All" ||
            filters.status !== "All" ||
            filters.time !== "Semua"
        );
    }, [search, filters]);

    const filteredTodos = useMemo(() => {
        if (!isFiltering) return todos;

        return todos.filter(todo => {
            // Search
            if (search && !todo.title?.toLowerCase().includes(search.toLowerCase())) return false;

            // Priority
            if (filters.priority !== "All" && todo.priority?.toLowerCase() !== filters.priority.toLowerCase()) return false;

            // Status
            if (filters.status !== "All" && todo.status?.toLowerCase() !== filters.status.toLowerCase()) return false;

            // Time
            if (filters.time !== "Semua") {
                if (!todo.date) return false;
                const todoDate = new Date(todo.date);
                todoDate.setHours(0, 0, 0, 0);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const diffDays = Math.ceil((todoDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                if (filters.time === "Hari ini" && diffDays !== 0) return false;
                if (filters.time === "7 Hari" && (diffDays < 0 || diffDays > 7)) return false;
                if (filters.time === "1 Bulan" && (diffDays < 0 || diffDays > 30)) return false;
                if (filters.time === "3 Bulan" && (diffDays < 0 || diffDays > 90)) return false;
            }

            return true;
        });
    }, [todos, search, filters, isFiltering]);

    return {
        todos,
        filteredTodos,
        isFiltering,
        loading,
        error,
        toggleTodo,
        deleteTodo,
        filters,
        setFilters,
        search,
        setSearch,
    };
}