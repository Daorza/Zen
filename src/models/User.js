/**
 * User model — parses raw API user data into a clean, consistent shape.
 * @param {object} data - Raw user object from API response
 * @returns {{ id: string, name: string, email: string }}
 */
export function createUser(data = {}) {
    return {
        id: data.id ?? '',
        name: data.name ?? '',
        email: data.email ?? '',
    }
}

export default createUser;
