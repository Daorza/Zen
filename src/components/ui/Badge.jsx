import React from 'react';

const STATUS_DATA = {
    pending: {
        label: "Pending",
        color: "bg-amber-400",
        badge: "text-amber-600 bg-amber-400/10 border-amber-400/20 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20",
    },
    done: {
        label: "Done",
        color: "bg-emerald-400",
        badge: "text-emerald-600 bg-emerald-400/10 border-emerald-400/20 dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20",
    },
    skipped: {
        label: "Skipped",
        color: "bg-slate-400",
        badge: "text-slate-500 bg-slate-400/10 border-slate-400/20 dark:text-slate-400 dark:bg-slate-400/10 dark:border-white/10",
    },
};

const PRIORITY_DATA = {
    low: {
        label: "Low",
        className: "text-slate-500 bg-slate-400/10 border-slate-300 dark:text-slate-400 dark:border-white/10",
    },
    medium: {
        label: "Medium",
        className: "text-amber-600 bg-amber-400/10 border-amber-300 dark:text-amber-400 dark:border-amber-400/20",
    },
    high: {
        label: "High",
        className: "text-red-600 bg-red-400/10 border-red-300 dark:text-red-400 dark:border-red-400/20",
    },
};

export const StatusBadge = ({ status, className = "" }) => {
    const data = STATUS_DATA[status?.toLowerCase()] ?? STATUS_DATA.pending;
    return (
        <span className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border text-[10px] ${data.badge} ${className}`}>
            {data.label}
        </span>
    );
};

export const PriorityBadge = ({ priority, className = "" }) => {
    const data = PRIORITY_DATA[priority?.toLowerCase()];
    if (!data) return null;
    return (
        <span className={`px-2 py-0.5 rounded-md font-medium border text-[10px] uppercase tracking-wider ${data.className} ${className}`}>
            {data.label}
        </span>
    );
};

export const getStatusData = (status) => STATUS_DATA[status?.toLowerCase()] ?? STATUS_DATA.pending;
export const getPriorityData = (priority) => PRIORITY_DATA[priority?.toLowerCase()] ?? null;
export const getAllStatuses = () => STATUS_DATA;
export const getAllPriorities = () => PRIORITY_DATA;
