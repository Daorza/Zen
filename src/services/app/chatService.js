import api from "../api";

/**
 * Chat Service
 * Abstraction layer for all AI chat API calls.
 * Swap the mock implementations below with real API calls when the backend is ready.
 */
const chatService = {
    /**
     * Send a message to the AI and get a response.
     * @param {Array<{role: "user"|"assistant", content: string}>} messages - Full conversation history
     * @returns {Promise<{role: "assistant", content: string}>}
     */
    sendMessage: async (messages) => {
        // TODO: Replace with real API call
        // const response = await api.post("/chat/send", { messages });
        // return response.data;

        // Mock response for development
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const lastMessage = messages[messages.length - 1]?.content ?? "";
        return {
            role: "assistant",
            content: getMockResponse(lastMessage),
        };
    },

    /**
     * Fetch previous chat history from the server.
     * @returns {Promise<Array<{role: "user"|"assistant", content: string}>>}
     */
    getHistory: async () => {
        // TODO: Replace with real API call
        // const response = await api.get("/chat/history");
        // return response.data;
        return [];
    },
};

// ─── Mock Response Helper ──────────────────────────────────────────────────────
function getMockResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes("task") || lower.includes("tugas"))
        return "Tentu! Saya bisa bantu kamu mengatur prioritas tugas, membuat checklist, atau mengingatkan deadline. Mau mulai dari mana?";
    if (lower.includes("jadwal") || lower.includes("schedule"))
        return "Wah, jadwalmu penuh ya! Yuk saya bantu susun agar lebih teratur. Ceritakan aktivitasmu dulu, kita atur bersama!";
    if (lower.includes("fokus") || lower.includes("focus") || lower.includes("konsentrasi"))
        return "Fokus itu kunci produktivitas! Coba teknik Pomodoro: kerja 25 menit, istirahat 5 menit. Mau saya bantu catat sesinya?";
    if (lower.includes("catatan") || lower.includes("notes"))
        return "Ide bagus untuk dicatat sebelum lupa! Saya bisa bantu kamu meringkas, mengorganisir, atau mencari catatan lama. Apa yang ingin kamu lakukan?";
    return "Hei, saya Genzen AI — asisten produktivitas kamu! Saya siap membantu mengatur tugas, jadwal, dan memaksimalkan fokusmu. Ada yang bisa saya bantu hari ini?";
}

export default chatService;
