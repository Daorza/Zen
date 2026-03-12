export function createHeatmap(data = {}) {
    return {
        date: data.date ?? new Date(),
        focus_minutes: data.focus_minutes ?? 0,
        tasks_completed: data.tasks_completed ?? 0
    }
}

export function createHeatmapList(data = []) {
    return data.map(createHeatmap)
}