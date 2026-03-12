// {
//     "success": true,
//     "message": "Dashboard summary fetched successfully",
//     "data": {
//         "period": "week",
//         "totalActivities": 0,
//         "doneActivities": 0,
//         "focusTimeMinutes": 0,
//         "focusTimeHours": 0
//     }
// }

import { createHeatmapList } from "../../models/Heatmap";
import { createStatistic } from "../../models/Statistic";
import api from "../api"
export const DashboardService = {
    async getSummary() {
        const { data } = await api.get('/dashboard/summary');
        return createStatistic(data.data)
    },
    async getHeatmap() {
        const { data } = await api.get('/dashboard/heatmap');
        return createHeatmapList(data.data)
    },
}