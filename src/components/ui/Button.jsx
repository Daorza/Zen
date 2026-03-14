import React from "react";
import { cn } from "../../lib/cn.jsx";

export function Button({
  className,
  children,
  type = "button",
  variant = "primary",
  ...props
}) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-400 cursor-pointer tracking-wide",
        variant === "primary" && "bg-indigo-700 text-white hover:bg-indigo-600",
        variant === "secondary" &&
          "bg-slate-50 text-slate-950 dark:bg-mist-50 dark:text-mist-950",
        variant === "disabled" &&
          "bg-gray-300 text-gray-500 cursor-not-allowed",
        variant === "outline" &&
          "border border-gray-600 text-gray-500 hover:bg-gray-200/40 dark:hover:bg-gray-300",
        className,
      )}
    >
      {children}
    </button>
  );
}
