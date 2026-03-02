function GlassCard({ children, className = "", ...props }) {
  return (
    <div
      className={`glass border border-white/40 backdrop-blur-glass p-8 md:p-12 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
export default GlassCard;