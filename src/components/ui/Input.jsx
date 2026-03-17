export const TextInput = ({ type, placeholder, value, onChange, className, ...props }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
            className={`w-full border-b border-slate-200 dark:border-white/10 bg-transparent pb-1 pl-1 text-lg dark:text-white text-slate-800 outline-none focus:border-indigo-500 ${className}`}
        />
    )
}

export const Textarea = ({ placeholder, value, onChange, className, ...props }) => {
    return (
        <textarea
            placeholder={placeholder}
            onChange={onChange}
            {...props}
            defaultValue={value}
            className={`w-full resize-none rounded-md p-4 dark:bg-white/5 bg-slate-600/5  text-sm dark:text-white text-slate-600 outline-none focus:dark:bg-white/10 focus:bg-indigo-400/10 transition-all duration-300 ${className}`}
        />
    )
}

export const TimeInput = ({
    placeholder,
    value,
    onChange,
    className,
    ...props
}) => {
    return (
        <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
            className={`w-full resize-none rounded-md p-4 dark:bg-white/5 bg-slate-600/5  text-sm dark:text-white text-slate-600 outline-none focus:dark:bg-white/10 focus:bg-indigo-400/10 transition-all duration-300 ${className}`}
        />
    )
}