import { cn } from "../../lib/cn";

export function Section({
  children,
  className,
  variant = "default",
  size = "sm",
  ...props
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variant === "default" && 
          "bg-indigo-100 dark:bg-slate-900 ",
        variant === "muted" &&
          "bg-transparent backdrop-blur-sm blur-md pointer-events-none",
        size === "sm" && "py-12 md:py-16",
        size === "md" && "py-16 md:py-24",
        size === "lg" && "py-24 md:py-32",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
