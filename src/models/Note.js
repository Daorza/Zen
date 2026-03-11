/**
 * Note model — parses raw API note data into a clean, consistent shape.
 * @param {object} data - Raw note object from API response
 */
export function createNote(data = {}) {
    return {
        id: data.id ?? '',
        userId: data.userId ?? '',
        title: data.title ?? '',
        content: data.content ?? '',
        isPinned: data.isPinned ?? false,
        relatedDate: data.relatedDate ? new Date(data.relatedDate) : null,
        source: data.source ?? 'manual',   // 'manual' | 'ai'
        createdAt: data.createdAt ? new Date(data.createdAt) : null,
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
    }
}

/**
 * Parse an array of raw notes.
 * @param {object[]} list
 * @returns {ReturnType<createNote>[]}
 */
export function createNoteList(list = []) {
    return list.map(createNote);
}

export default createNote;
