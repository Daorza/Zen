import { useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen flex items-center justify-center bg-linear-to-tr to-indigo-100 via-zinc-200 from-indigo-300 dark:from-indigo-950 dark:via-gray-900 dark:to-slate-900 transition-all duration-300 ease-in-out p-4">

            {/* Ambient blobs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-400/20 dark:bg-indigo-700/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400/20 dark:bg-blue-800/20 rounded-full blur-3xl pointer-events-none" />

            <GlassCard className="relative flex flex-col items-center gap-8 p-10 sm:p-14 max-w-lg w-full text-center">

                {/* Icon */}
                <div className="p-5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 border border-indigo-300/50 dark:border-indigo-500/20">
                    <SearchX
                        size={48}
                        className="text-indigo-500 dark:text-indigo-400"
                        strokeWidth={1.5}
                    />
                </div>

                {/* 404 */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-8xl font-black bg-linear-60 from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent leading-none select-none">
                        404
                    </h1>
                    <h2 className="text-xl font-extrabold text-gray-800 dark:text-white/90 uppercase tracking-wide">
                        Page Not Found
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-white/40 font-medium max-w-xs mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 font-bold text-sm hover:bg-indigo-500/10 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold text-sm active:scale-95 transition-all duration-200 cursor-pointer shadow shadow-indigo-400/40"
                    >
                        <Home size={16} />
                        Go to Dashboard
                    </button>
                </div>
            </GlassCard>
        </div>
    );
}
