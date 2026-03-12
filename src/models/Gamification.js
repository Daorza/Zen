/**
 * Gamification model — parses raw API gamification data.
 * @param {object} data - Raw gamification object from API response
 */
export function createGamification(data = {}) {
    return {
        id: data.id ?? '',
        userId: data.userId ?? '',
        currentStreak: data.currentStreak ?? 0,
        longestStreak: data.longestStreak ?? 0,
        lastUpdateDate: data.lastUpdateDate ? new Date(data.lastUpdateDate) : null,
    }
}

export default createGamification;
