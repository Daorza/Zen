export const TextInput = ({ type, placeholder, value, onChange, className }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full border-b border-white/10 bg-transparent pb-1 pl-1 text-lg text-white outline-none focus:border-indigo-500 ${className}`}
        />
    )
}

export const Textarea = ({ placeholder, value, onChange, className }) => {
    return (
        <textarea
            placeholder={placeholder}
            onChange={onChange}
            className={`w-full resize-none rounded-2xl bg-white/5 p-4 text-sm text-white outline-none focus:bg-white/10 ${className}`}
        >{value}</textarea>
    )
}