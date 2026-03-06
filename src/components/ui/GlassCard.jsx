function GlassCard({ children, className = "", ...props }) {
  return (
    <div
      className={` bg-white/40 dark:bg-mist-600/20  backdrop-blur-md rounded-2xl border border-indigo-300 dark:border-blue-950 shadow shadow-indigo-400 dark:shadow-neutral-500 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
export default GlassCard;