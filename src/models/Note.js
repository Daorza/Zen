/**
 * Note model — parses raw API note data into a clean, consistent shape.
 * @param {object} data - Raw note object from API response
 */
export function createNote(data = {}) {
    let cat = data.category ?? null;
    if (cat && cat.deletedAt) {
        cat = null;
    }

    return {
        id: data.id ?? '',
        userId: data.userId ?? '',
        categoryId: cat ? (data.categoryId ?? null) : null,
        category: cat,
        title: data.title ?? '',
        content: data.content ?? '',
        color: data.color ?? null,
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
