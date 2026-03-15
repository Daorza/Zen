import api from "../api";

export const aiParseService = {
    /**
     * Parse prompt via AI
     * @param {string} prompt 
     * @returns {Promise<any>} Raw response data from backend
     */
    async parsePrompt(prompt) {
        const { data } = await api.post('/ai/parse', { prompt });
        // The structure from backend is { success: true, message: "...", data: { type, message, activities, notes, warnings } }
        return data.data;
    },

    /**
     * Confirm and save a list of activities
     * @param {Array} activities 
     * @returns {Promise<Array>}
     */
    async confirmActivities(activities) {
        const results = [];
        for (const item of activities) {
            // Include `source` as it is required by the API
            const { userId, ...payload } = item;
            if (!payload.source) payload.source = "ai";
            const { data } = await api.post('/activities', payload);
            results.push(data.data);
        }
        return results;
    },

    /**
     * Confirm and save a list of notes
     * @param {Array} notes 
     * @returns {Promise<Array>}
     */
    async confirmNotes(notes) {
        const results = [];
        for (const item of notes) {
            // Include `source` as it is required by the API
            const { userId, ...payload } = item;
            if (!payload.source) payload.source = "ai";
            const { data } = await api.post('/notes', payload);
            results.push(data.data);
        }
        return results;
    }
};

export default aiParseService;
