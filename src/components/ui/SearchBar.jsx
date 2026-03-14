import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { X } from "lucide-react";

export const SearchBar = ({ value, setSearch, placeholder, ...props }) => {
    const onChange = (e) => {
        setSearch(e.target.value);
    }
    return (
        <div className="group relative w-full">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500 transition group-focus-within:text-indigo-400" />

            <input type="text"
                placeholder="Search notes...."
                className="w-full rounded-2xl border dark:border-white/10 border-slate-300 bg-white/60  dark:bg-white/5 py-4 px-10 text-sm text-slate-600 dark:text-white outline-none transition focus:border-indigo-500 focus:bg-white/10 "
                {...props}
                value={value}
                onChange={onChange}
            />
            {value && (
                <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-white/30 text-gray-400 hover:dark:text-white/60 hover:text-gray-600 cursor-pointer transition-colors"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    )
}

export default SearchBar