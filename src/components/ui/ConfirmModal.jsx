import { motion, AnimatePresence } from "motion/react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi",
  description = "Apakah kamu yakin?",
  confirmText = "Ya",
  cancelText = "Batal",
  variant = "default", // "danger"
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed z-50 inset-0 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-900 p-5 shadow-xl border dark:border-white/10">
              
              <h2 className="text-xl font-bold mb-2 dark:text-white">
                {title}
              </h2>

              <p className="text-sm text-gray-600 dark:text-white/60 mb-5">
                {description}
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-md text-sm bg-gray-200 dark:bg-white/10 cursor-pointer hover:bg-gray-300 dark:hover:bg-white/20 transition-colors duration-300 border border-gray-200 dark:border-white/20"
                >
                  {cancelText}
                </button>

                <button
                  onClick={onConfirm}
                  className={`px-4 py-2 rounded-md text-sm text-white cursor-pointer border transition-colors duration-300
                    ${
                      variant === "danger"
                        ? "bg-red-500/40 hover:bg-red-500 border-red-500/40"
                        : "bg-indigo-500 hover:bg-indigo-600 border-indigo-500"
                    }
                  `}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;