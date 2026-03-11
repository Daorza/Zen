/**
 * Activity model — parses raw API activity data into a clean, consistent shape.
 * @param {object} data - Raw activity object from API response
 */
export function createActivity(data = {}) {
    return {
        id: data.id ?? '',
        userId: data.userId ?? '',
        title: data.title ?? '',
        description: data.description ?? null,
        type: data.type ?? 'task',           // 'task' | 'schedule'
        date: data.date ? new Date(data.date) : null,
        startTime: data.startTime ?? null,   // 'HH:MM'
        endTime: data.endTime ?? null,       // 'HH:MM'
        status: data.status ?? 'pending',   // 'pending' | 'done' | 'skipped'
        priority: data.priority ?? null,    // 'low' | 'medium' | 'high'
        linkUrl: data.linkUrl ?? null,
        source: data.source ?? 'manual',    // 'manual' | 'ai'
        createdAt: data.createdAt ? new Date(data.createdAt) : null,
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
    }
}

/**
 * Parse an array of raw activities.
 * @param {object[]} list
 * @returns {ReturnType<createActivity>[]}
 */
export function createActivityList(list = []) {
    return list.map(createActivity);
}

export default createActivity;
