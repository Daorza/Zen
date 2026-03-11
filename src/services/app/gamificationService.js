import api from "../api";
import { createGamification } from "../../models/Gamification";

export const gamificationService = {
    /**
     * Get gamification data for the logged-in user.
     * If no data exists, the API will auto-create it with zeros.
     * @returns {ReturnType<createGamification>}
     */
    async get() {
        const { data } = await api.get('/gamification');
        return createGamification(data.data);
    },
}

export default gamificationService;
