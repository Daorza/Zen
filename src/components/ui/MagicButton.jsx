import { motion } from "motion/react";

const VARIANTS = {
    primary: {
        base: "bg-indigo-500 dark:bg-indigo-600 text-white border border-indigo-400/40 dark:border-indigo-400/20",
        hover: "hover:bg-indigo-600 dark:hover:bg-indigo-500",
        shadow: "shadow-indigo-500/25 hover:shadow-indigo-500/60",
        glow: "group-hover:opacity-100",
        glowColor: "bg-radial-[ellipse_80%_50%_at_50%_120%] from-indigo-300/30 to-transparent",
    },
    secondary: {
        base: "bg-white/10 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 border border-indigo-300/60 dark:border-indigo-500/20",
        hover: "hover:bg-indigo-500/10 dark:hover:bg-indigo-500/10",
        shadow: "shadow-black/5 hover:shadow-indigo-400/30",
        glow: "group-hover:opacity-100",
        glowColor: "bg-radial-[ellipse_80%_50%_at_50%_120%] from-indigo-400/20 to-transparent",
    },
    danger: {
        base: "bg-red-500 dark:bg-red-600 text-white border border-red-400/40 dark:border-red-400/20",
        hover: "hover:bg-red-600 dark:hover:bg-red-500",
        shadow: "shadow-red-500/25 hover:shadow-red-500/60",
        glow: "group-hover:opacity-100",
        glowColor: "bg-radial-[ellipse_80%_50%_at_50%_120%] from-red-300/30 to-transparent",
    },
    ghost: {
        base: "bg-transparent text-gray-600 dark:text-white/50 border border-transparent",
        hover: "hover:bg-indigo-500/10 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300/40 dark:hover:border-indigo-500/20",
        shadow: "shadow-none hover:shadow-indigo-400/10",
        glow: "group-hover:opacity-100",
        glowColor: "bg-radial-[ellipse_80%_50%_at_50%_120%] from-indigo-300/10 to-transparent",
    },
};

const SIZES = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
};

export function MagicButton({
    className = "",
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    ...props
}) {
    const v = VARIANTS[variant] ?? VARIANTS.primary;
    const s = SIZES[size] ?? SIZES.md;

    return (
        <motion.button
            {...props}
            disabled={disabled}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className={`
                group relative inline-flex items-center justify-center overflow-hidden
                rounded-xl font-semibold tracking-wide cursor-pointer
                shadow-md hover:shadow-lg
                transition-[background-color,box-shadow,border-color,color,opacity] duration-200
                disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
                ${v.base} ${v.hover} ${v.shadow}
                ${s} ${className}
            `}
        >
            <span
                aria-hidden
                className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${v.glow} ${v.glowColor}`}
            />
            <span
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 h-full w-1/2 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-500 ease-in-out bg-linear-to-r from-transparent via-white/25 to-transparent skew-x-12"
            />
            <span className="relative z-10 inline-flex items-center gap-[inherit]">
                {children}
            </span>
        </motion.button>
    );
}