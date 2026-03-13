import { useState, useMemo } from "react";
import useSWR from "swr";
import activityService from "../services/app/activityService";

export function useTodos() {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        priority: "All",
        status: "All",
        time: "Semua",
    });

    const { data: todos = [], error, isLoading, mutate } = useSWR(
        "/activities/all",
        () => activityService.getAll()
    );

    const toggleTodo = async (id) => {
        const optimisticData = todos.map(todo =>
            todo.id === id
                ? { ...todo, status: todo.status === "pending" ? "done" : "pending" }
                : todo
        );

        await mutate(
            async () => {
                const updatedTodo = await activityService.toggle(id);
                return todos.map((t) => (t.id === id ? updatedTodo : t));
            },
            {
                optimisticData,
                rollbackOnError: true,
                populateCache: true,
                revalidate: false
            }
        );
    };

    const deleteTodo = async (id) => {
        const optimisticData = todos.filter(todo => todo.id !== id);

        await mutate(
            async () => {
                await activityService.remove(id);
                return optimisticData;
            },
            {
                optimisticData,
                rollbackOnError: true,
                populateCache: true,
                revalidate: false
            }
        );
    };

    const addTodo = async (data) => {
        const tempId = `temp-${Date.now()}`;
        const optimisticTodo = { ...data, id: tempId };
        const optimisticData = [...todos, optimisticTodo];

        await mutate(
            async () => {
                const newTodo = await activityService.create(data);
                return [...todos, newTodo];
            },
            {
                optimisticData,
                rollbackOnError: true,
                populateCache: true,
                revalidate: false
            }
        );
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
        let result = todos;

        if (isFiltering) {
            result = todos.filter(todo => {
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
        }

        return [...result].sort((a, b) => {
            if (a.status === 'pending' && b.status !== 'pending') return -1;
            if (a.status !== 'pending' && b.status === 'pending') return 1;
            return 0;
        });
    }, [todos, search, filters, isFiltering]);

    return {
        todos,
        filteredTodos,
        isFiltering,
        loading: isLoading,
        error,
        toggleTodo,
        deleteTodo,
        filters,
        setFilters,
        search,
        setSearch,
        addTodo
    };
}