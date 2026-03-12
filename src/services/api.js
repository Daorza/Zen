import axios from "axios";
import authStore from "../storage/authStore";

const api = axios.create(
    {
        baseURL: "https://apigenzen.vercel.app/api",
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000
    }
)

api.interceptors.request.use(
    (config) => {
        const token = authStore.getAccessToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    })
    failedQueue = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config
        if (error.response?.status === 401 && !original._retry) {
            const refreshToken = authStore.getRefreshToken();

            if (!refreshToken) {
                authStore.clear();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise(
                    (resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }
                ).then((token) => {
                    original.headers.Authorization = `Bearer ${token}`;
                    return api(original);
                })
            }

            original._retry = true;
            isRefreshing = true;
            try {
                const { data } = await axios.post(
                    `${import.meta.env.API_URL}/api/auth/refresh`,
                    { refreshToken }
                );
                const newToken = data.data.accessToken;
                authStore.setAccessToken(newToken);
                processQueue(null, newToken);
                original.headers.Authorization = `Bearer ${newToken}`;
                return api(original)
            } catch (err) {
                processQueue(err, null);
                authStore.clear();
                window.location.href = '/auth/login';
                return Promise.reject(error)
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error)
    }
)

export const swrFetcher = (url) => api.get(url).then((res) => res.data.data ?? res.data);

export default api