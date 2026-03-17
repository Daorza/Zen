import { AnimatePresence, motion } from "motion/react";

const Modal = ({ isOpen, onClose, title, children, className }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    onClick={onClose}
                    className={`fixed inset-0 flex items-center justify-center z-50
                               bg-gray-900/30 dark:bg-slate-900/40 backdrop-blur-sm ${className}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg mx-4 rounded-2xl shadow-2xl
                                   border border-gray-200 dark:border-white/10
                                   bg-white dark:bg-slate-900"
                        initial={{ opacity: 0, scale: 0.95, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 16 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                    >
                        {title && (
                            <div className="flex items-center justify-between
                                            border-b border-gray-200 dark:border-white/10
                                            px-6 py-4">
                                <p className="text-sm font-bold tracking-widest uppercase
                                              text-gray-400 dark:text-slate-400">
                                    {title}
                                </p>
                                <button
                                    onClick={onClose}
                                    className="text-lg leading-none transition-colors cursor-pointer
                                               text-gray-400 hover:text-gray-900
                                               dark:text-slate-500 dark:hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                        <div>{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;