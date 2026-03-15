import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Stars, Send, Mic, Paperclip, CheckSquare, Calendar, StickyNote, LayoutDashboard } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import { MagicButton } from "../../components/ui/MagicButton";
import authStore from "../../storage/authStore";
import aiParseService from "../../services/app/aiParseService";
import ParsePreviewCard from "../../components/chat/ParsePreviewCard";

// ─── Prompt Suggestion Cards ───────────────────────────────────────────────────
const PROMPT_SUGGESTIONS = [
    {
        icon: CheckSquare,
        title: "Bantu atur tugasku",
        subtitle: "Prioritaskan dan rencanakan tugas harianmu bersama Genzen AI.",
        prompt: "Bantu saya mengatur dan memprioritaskan tugas hari ini.",
    },
    {
        icon: Calendar,
        title: "Susun jadwalku",
        subtitle: "Buat jadwal yang realistis agar harimu lebih produktif.",
        prompt: "Bantu saya menyusun jadwal harian yang efektif dan produktif.",
    },
    {
        icon: StickyNote,
        title: "Ringkas catatanku",
        subtitle: "Ubah catatan panjang menjadi poin-poin kunci yang mudah diingat.",
        prompt: "Bantu saya meringkas catatan menjadi poin-poin penting.",
    },
    {
        icon: LayoutDashboard,
        title: "Analisis produktivitasku",
        subtitle: "Lihat seberapa produktif kamu dan temukan area yang perlu ditingkatkan.",
        prompt: "Analisis pola produktivitas saya dan beri saran peningkatan.",
    },
];

// ─── Animation Variants ────────────────────────────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 28 } },
};

const messageVariants = {
    hidden: (isUser) => ({ opacity: 0, x: isUser ? 40 : -40, scale: 0.95 }),
    visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 380, damping: 30 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
};

// ─── Sub-components ────────────────────────────────────────────────────────────
function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-end gap-2 max-w-[80%]"
        >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 shrink-0">
                <Stars size={14} className="text-indigo-400" />
            </div>
            <div className="bg-white/40 dark:bg-white/5 border border-indigo-200/60 dark:border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 backdrop-blur-sm">
                <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function MessageBubble({ message }) {
    const isUser = message.role === "user";
    return (
        <motion.div
            custom={isUser}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className={`flex items-end gap-2 ${isUser ? "flex-row-reverse self-end max-w-[80%]" : "flex-row self-start max-w-[85%]"}`}
        >
            {/* Avatar */}
            {!isUser && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 shrink-0">
                    <Stars size={14} className="text-indigo-400" />
                </div>
            )}

            {/* Bubble */}
            <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${isUser
                    ? "bg-indigo-600 text-white rounded-br-sm shadow-md shadow-indigo-500/25"
                    : "bg-white/40 dark:bg-white/5 text-gray-800 dark:text-white/90 border border-indigo-200/60 dark:border-white/10 backdrop-blur-sm rounded-bl-sm"
                    }`}
            >
                {message.content}
            </div>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ChatPage() {
    const user = authStore.getUser();
    const name = user?.name?.split(" ")[0] ?? "Kamu";

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [parseResult, setParseResult] = useState(null);
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const hasMessages = messages.length > 0;

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
        }
    }, [input]);

    const sendMessage = useCallback(async (text) => {
        const trimmed = text.trim();
        if (!trimmed || isLoading) return;

        const userMsg = { role: "user", content: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const aiData = await aiParseService.parsePrompt(trimmed);
            const aiMsg = { role: "assistant", content: aiData.message };
            setMessages((prev) => [...prev, aiMsg]);

            if (["activity", "note", "mixed"].includes(aiData.type)) {
                setParseResult(aiData);
            }
            console.log(aiData);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Maaf, terjadi kesalahan saat memproses pesanmu. Coba lagi ya! 🙏" },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    const handleConfirm = async () => {
        if (!parseResult) return;
        setIsConfirmLoading(true);
        try {
            if (parseResult.activities && parseResult.activities.length > 0) {
                await aiParseService.confirmActivities(parseResult.activities);
            }
            if (parseResult.notes && parseResult.notes.length > 0) {
                await aiParseService.confirmNotes(parseResult.notes);
            }
            setMessages(prev => [...prev, { role: "assistant", content: "✅ Tersimpan! Kamu bisa cek di halaman Aktivitas atau Catatan." }]);
            setParseResult(null);
        } catch (error) {
            // console.error("=== ERROR KETIKA SIMPAN ===");
            // console.error(error);
            // if (error.response) {
            //     console.error("Response backend:", error.response.data);
            // }
            // console.error("===========================");
            setMessages(prev => [...prev, { role: "assistant", content: "Maaf, gagal menyimpan. Coba lagi ya!" }]);
        } finally {
            setIsConfirmLoading(false);
        }
    };

    const handleDismiss = () => {
        setParseResult(null);
        setMessages(prev => [...prev, { role: "assistant", content: "Oke, tidak jadi disimpan." }]);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const handlePromptClick = (prompt) => {
        sendMessage(prompt);
    };

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">

            {/* ── Message Area ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">
                    {!hasMessages ? (
                        /* ── Landing State ── */
                        <motion.div
                            key="landing"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                            className="flex flex-col gap-10 p-6 sm:p-10 pt-14 sm:pt-16 pb-4"
                        >
                            {/* Greeting */}
                            <motion.div variants={itemVariants} className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500/15 border border-indigo-400/25">
                                        <Stars size={18} className="text-indigo-500 dark:text-indigo-400" />
                                    </div>
                                    <span className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 tracking-wide uppercase">Genzen AI</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1">
                                    Halo, {name}! 👋
                                </h1>
                                <p className="text-lg text-gray-500 dark:text-white/50 font-medium">
                                    Ada yang bisa saya bantu hari ini?
                                </p>
                            </motion.div>

                            {/* Suggestion Cards */}
                            <motion.div
                                variants={containerVariants}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {PROMPT_SUGGESTIONS.map((item) => (
                                    <motion.div
                                        key={item.title}
                                        variants={itemVariants}
                                        whileHover={{ y: -4, scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handlePromptClick(item.prompt)}
                                    >
                                        <GlassCard className="flex flex-col justify-between gap-6 p-5 cursor-pointer group hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-colors duration-200 h-36">
                                            <p className="text-sm font-semibold text-gray-700 dark:text-white/80 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-200 leading-relaxed">
                                                {item.title}
                                                <span className="block mt-1 text-xs font-normal text-gray-500 dark:text-white/40 group-hover:text-gray-600 dark:group-hover:text-white/50">
                                                    {item.subtitle}
                                                </span>
                                            </p>
                                            <div className="flex justify-end">
                                                <item.icon
                                                    size={20}
                                                    className="text-gray-400 dark:text-white/20 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200"
                                                />
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ) : (
                        /* ── Chat State ── */
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-4 p-4 sm:p-6 pt-6"
                        >
                            <AnimatePresence>
                                {messages.map((msg, i) => (
                                    <MessageBubble key={i} message={msg} />
                                ))}
                            </AnimatePresence>

                            <AnimatePresence>
                                {parseResult && (
                                    <ParsePreviewCard
                                        key="previewCard"
                                        data={parseResult}
                                        onConfirm={handleConfirm}
                                        onDismiss={handleDismiss}
                                        isLoading={isConfirmLoading}
                                    />
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {isLoading && <TypingIndicator key="typing" />}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Input Bar ── */}
            <div className="shrink-0 p-3 sm:p-5 pb-24 md:pb-5">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.2 }}
                >
                    <GlassCard className="flex items-end gap-3 p-3 rounded-2xl">
                        {/* Attach button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-xl text-gray-400 dark:text-white/30 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors duration-200 shrink-0 self-end"
                            aria-label="Lampirkan file"
                        >
                            <Paperclip size={18} />
                        </motion.button>

                        {/* Textarea */}
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Tanyakan apa saja..."
                            disabled={isLoading}
                            className="flex-1 resize-none bg-transparent text-sm text-gray-800 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-white/30 outline-none leading-relaxed py-2 max-h-40 overflow-y-auto no-scrollbar disabled:opacity-60"
                        />

                        {/* Mic + Send */}
                        <div className="flex items-center gap-1 shrink-0 self-end">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-xl text-gray-400 dark:text-white/30 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors duration-200"
                                aria-label="Input suara"
                            >
                                <Mic size={18} />
                            </motion.button>

                            <MagicButton
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || isLoading}
                                size="md"
                                className="p-2.5 rounded-xl"
                                aria-label="Kirim pesan"
                            >
                                <Send size={16} />
                            </MagicButton>
                        </div>
                    </GlassCard>
                    <p className="text-center text-xs text-gray-400 dark:text-white/20 mt-2">
                        Tekan Enter untuk kirim · Shift+Enter untuk baris baru
                    </p>
                </motion.div>
            </div>
        </div>
    );
}