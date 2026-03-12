export function createStatistic(data = {}) {
    return {
        period: data.period ?? "week",
        totalActivities: data.totalActivities ?? 0,
        doneActivities: data.doneActivities ?? 0,
        focusTimeMinutes: data.focusTimeMinutes ?? 0,
        focusTimeHours: data.focusTimeHours ?? 0
    }
}