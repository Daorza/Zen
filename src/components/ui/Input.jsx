export const TextInput = ({ type, placeholder, value, onChange, className, ...props }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
            className={`w-full border-b border-white/10 bg-transparent pb-1 pl-1 text-lg text-white outline-none focus:border-indigo-500 ${className}`}
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
            className={`w-full resize-none rounded-md bg-white/5 p-4 text-sm text-white outline-none focus:bg-white/10 ${className}`}
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
            className={`w-full resize-none rounded-md bg-white/5 p-2.5 cursor-pointer flex items-center text-sm text-white outline-none focus:bg-white/10 ${className}`}
        />
    )
}