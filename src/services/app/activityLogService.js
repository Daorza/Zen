import api from "../api";
import { createActivityLogList, createHeatmapEntry } from "../../models/ActivityLog";

export const activityLogService = {
    /**
     * Get activity logs for the user.
     * @param {{ activityId?: string }} params
     */
    async getAll(params = {}) {
        const { data } = await api.get('/activity-logs', { params });
        return createActivityLogList(data.data);
    },

    /**
     * Get heatmap data — completed activities count per day for the last year.
     * @returns {{ date: string, count: number }[]}
     */
    async getHeatmap() {
        const { data } = await api.get('/activity-logs/heatmap');
        return (data.data ?? []).map(createHeatmapEntry);
    },
}

export default activityLogService;
