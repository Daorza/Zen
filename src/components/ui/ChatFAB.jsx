import { Link, useLocation } from "react-router-dom";
import { Stars } from "lucide-react";

export default function ChatFAB() {
    const location = useLocation();

    if (location.pathname === "/chat") {
        return null;
    }

    return (
        <div className="fixed z-50 md:bottom-20 md:right-20 bottom-30 right-6 group">
            {/* Splash / Ping Effect */}
            <div className="absolute inset-0 bg-indigo-500/60 dark:bg-indigo-400/60 rounded-full animate-ping opacity-75"></div>

            {/* Main FAB */}
            <Link
                to="/chat"
                className="relative bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-400
                           p-4 rounded-full shadow-lg shadow-indigo-500/30 dark:shadow-indigo-500/20
                           transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/50 
                           active:scale-95 flex items-center justify-center overflow-hidden"
                aria-label="Open AI Chat"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full"></div>

                <Stars className="w-6 h-6 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
            </Link>
        </div>
    );
}
