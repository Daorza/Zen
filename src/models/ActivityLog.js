/**
 * ActivityLog model — parses raw API activity log data.
 * @param {object} data - Raw activity log object from API response
 */
export function createActivityLog(data = {}) {
    return {
        id: data.id ?? '',
        activityId: data.activityId ?? '',
        userId: data.userId ?? '',
        // 'created' | 'updated' | 'completed' | 'skipped'
        action: data.action ?? '',
        timestamp: data.timestamp ? new Date(data.timestamp) : null,
        // Nested activity summary (populated by API)
        activity: data.activity
            ? {
                id: data.activity.id ?? '',
                title: data.activity.title ?? '',
                type: data.activity.type ?? '',
            }
            : null,
    }
}

/**
 * Parse an array of raw activity logs.
 * @param {object[]} list
 * @returns {ReturnType<createActivityLog>[]}
 */
export function createActivityLogList(list = []) {
    return list.map(createActivityLog);
}

/**
 * Heatmap entry — one day's count from /activity-logs/heatmap
 * @param {{ date: string, count: number }} data
 */
export function createHeatmapEntry(data = {}) {
    return {
        date: data.date ?? '',   // 'YYYY-MM-DD'
        count: data.count ?? 0,
    }
}

export default createActivityLog;
