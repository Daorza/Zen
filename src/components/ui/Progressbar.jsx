import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

export function ProgressBar({ current = 14, total = 20, label = "Ingat aktivitas harianmu!" }) {
    const percentage = Math.round((current / total) * 100);
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <div
            ref={ref}
            className="relative h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800"
        >
            <motion.div
                className="absolute left-0 top-0 h-full rounded-full bg-linear-to-r from-indigo-400 to-indigo-500 shadow-sm shadow-indigo-500/40"
                initial={{ width: "0%" }}
                animate={inView ? { width: `${percentage}%` } : { width: "0%" }}
                transition={{ duration: 1, ease: [0.34, 1.2, 0.64, 1], delay: 0.15 }}
            >
                <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.9 }}
                        animate={hovered
                            ? { opacity: 1, y: -2, scale: 1 }
                            : { opacity: 0, y: 4, scale: 0.9 }
                        }
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2
                                px-2 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap
                                bg-indigo-600 dark:bg-indigo-500 text-white
                                shadow-md shadow-indigo-500/40 pointer-events-none"
                    >
                        {percentage}%
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-500" />
                    </motion.div>

                    <motion.div
                        animate={hovered
                            ? { scale: 1.4, boxShadow: "0 0 0 4px rgba(99,102,241,0.25)" }
                            : { scale: 1, boxShadow: "0 0 0 0px rgba(99,102,241,0)" }
                        }
                        transition={{ duration: 0.2 }}
                        className="w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-500 cursor-pointer"
                    />
                </div>
            </motion.div>
        </div>
    );
}