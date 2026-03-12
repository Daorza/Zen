import { createUser } from '../models/User';

const ACCESS_KEY = 'cpa_access_token'
const REFRESH_KEY = 'cpa_refresh_token'
const USER_KEY = 'cpa_user'

export const authStore = {
    getAccessToken: () => localStorage.getItem(ACCESS_KEY),
    getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
    getUser: () => { const u = localStorage.getItem(USER_KEY); return u ? JSON.parse(u) : null },
    setTokens({ accessToken, refreshToken }) {
        localStorage.setItem(ACCESS_KEY, accessToken)
        localStorage.setItem(REFRESH_KEY, refreshToken)
    },
    setAccessToken(token) {
        localStorage.setItem(ACCESS_KEY, token)
    },
    setRefreshToken(token) {
        localStorage.setItem(REFRESH_KEY, token)
    },
    setUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    clear() {
        localStorage.removeItem(ACCESS_KEY)
        localStorage.removeItem(REFRESH_KEY)
        localStorage.removeItem(USER_KEY)
    },
    save({ user, accessToken, refreshToken }) {
        this.setTokens({ accessToken, refreshToken })
        this.setUser(createUser(user))
    },
    isAuthenticated: () => !!localStorage.getItem(ACCESS_KEY)
}

export default authStore;
