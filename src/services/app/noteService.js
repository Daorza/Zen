import api from "../api";
import { createNote, createNoteList } from "../../models/Note";

export const noteService = {
    /**
     * Get all notes with optional filters.
     * @param {{ isPinned?: boolean, relatedDate?: string }} params
     */
    async getAll(params = {}) {
        const { data } = await api.get('/notes', { params });
        return createNoteList(data.data);
    },

    /**
     * Get a single note by ID.
     * @param {string} id
     */
    async getById(id) {
        const { data } = await api.get(`/notes/${id}`);
        return createNote(data.data);
    },

    /**
     * Create a new note.
     * @param {object} payload
     */
    async create(payload) {
        const { data } = await api.post('/notes', payload);
        return createNote(data.data);
    },

    /**
     * Update a note (partial).
     * @param {string} id
     * @param {object} payload
     */
    async update(id, payload) {
        const { data } = await api.put(`/notes/${id}`, payload);
        return createNote(data.data);
    },

    /**
     * Delete a note by ID.
     * @param {string} id
     */
    async remove(id) {
        await api.delete(`/notes/${id}`);
    },

    /**
     * Toggle the pin status of a note.
     * @param {string} id
     */
    async togglePin(id) {
        const { data } = await api.patch(`/notes/${id}/pin`);
        return createNote(data.data);
    },
}

export default noteService;
