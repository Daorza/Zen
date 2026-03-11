import api from "../api";
import authStore from "../../storage/authStore";
import { createUser } from "../../models/User";

export const authService = {
    async login(email, password) {
        const { data } = await api.post('/auth/login', { email, password });
        const user = createUser(data.data.user);
        authStore.save({ user, accessToken: data.data.accessToken, refreshToken: data.data.refreshToken });
        return { ...data.data, user };
    },

    async register(name, email, password, confirmPassword) {
        const { data } = await api.post('/auth/register', { name, email, password, confirmPassword });
        const user = createUser(data.data.user);
        authStore.save({ user, accessToken: data.data.accessToken, refreshToken: data.data.refreshToken });
        return { ...data.data, user };
    },

    async refreshToken() {
        const refreshToken = authStore.getRefreshToken();
        const { data } = await api.post('/auth/refresh', { refreshToken });
        authStore.setAccessToken(data.data.accessToken);
        return data.data.accessToken;
    },

    logout() {
        authStore.clear();
    }
}

export default authService;