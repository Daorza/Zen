import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

/**
 * FormInput — Reusable input component with icon support and password toggle.
 *
 * Props:
 * @param {string}      id            - Input id & htmlFor label
 * @param {string}      label         - Label text displayed above the input
 * @param {string}      type          - Input type: "text" | "email" | "password" | etc.
 * @param {string}      name          - Input name attribute
 * @param {string}      placeholder   - Placeholder text
 * @param {string}      autoComplete  - autoComplete attribute
 * @param {boolean}     required      - Whether the field is required
 * @param {ReactNode}   icon          - Leading icon element (e.g. <AtSymbolIcon className="size-5" />)
 * @param {string}      className     - Extra classes for the wrapper div
 * @param {object}      inputProps    - Any additional props passed directly to <input>
 */
export function FormInput({
    id,
    label,
    type = "text",
    name,
    placeholder,
    autoComplete,
    required = false,
    icon,
    className = "",
    ...inputProps
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                >
                    {label}
                </label>
            )}

            <div className="group mt-2 flex items-center gap-3 rounded-xl border border-slate-300/50 dark:border-slate-100/20 bg-slate-900/20 dark:bg-slate-400/20 px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                {icon && (
                    <span className="text-slate-500 transition group-focus-within:text-indigo-500 shrink-0">
                        {icon}
                    </span>
                )}

                <input
                    id={id}
                    type={resolvedType}
                    name={name}
                    required={required}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                    {...inputProps}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-slate-500 transition hover:text-indigo-500 shrink-0"
                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="size-5" />
                        ) : (
                            <EyeIcon className="size-5" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}