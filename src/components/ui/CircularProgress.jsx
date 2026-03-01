import { motion } from "motion/react";

/**
 * Reusable Circular Progress component
 * @param {number} percentage - 0 to 100
 * @param {number} size - Width/Height in pixels
 * @param {number} strokeWidth - Thickness of the progress stroke
 * @param {string} color - CSS color value
 */
const CircularProgress = ({
  percentage = 0,
  size = 120,
  strokeWidth = 10,
  color = "var(--color-indigo-500)",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center overflow-visible shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90 overflow-visible">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-indigo-200/40 dark:text-white/5"
        />
        {/* Progress Arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Text */}
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-black text-indigo-700 dark:text-white leading-none">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;