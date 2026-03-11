import api from "../api";
import { createActivity, createActivityList } from "../../models/Activity";

export const activityService = {
    /**
     * Get all activities with optional filters.
     * @param {{ date?, type?, status?, priority? }} params
     */
    async getAll(params = {}) {
        const { data } = await api.get('/activities', { params });
        return createActivityList(data.data);
    },

    /**
     * Get a single activity by ID.
     * @param {string} id
     */
    async getById(id) {
        const { data } = await api.get(`/activities/${id}`);
        return createActivity(data.data);
    },

    /**
     * Create a new activity.
     * @param {object} payload
     */
    async create(payload) {
        const { data } = await api.post('/activities', payload);
        return createActivity(data.data);
    },

    /**
     * Update an activity (partial).
     * @param {string} id
     * @param {object} payload
     */
    async update(id, payload) {
        const { data } = await api.put(`/activities/${id}`, payload);
        return createActivity(data.data);
    },

    /**
     * Delete an activity by ID.
     * @param {string} id
     */
    async remove(id) {
        await api.delete(`/activities/${id}`);
    },

    /**
     * Update only the status of an activity.
     * Automatically creates an ActivityLog on the server.
     * @param {string} id
     * @param {'pending' | 'done' | 'skipped'} status
     */
    async updateStatus(id, status) {
        const { data } = await api.patch(`/activities/${id}/status`, { status });
        return createActivity(data.data);
    },
}

export default activityService;
