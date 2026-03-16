import { FolderPlusIcon } from "@heroicons/react/24/solid"
import { MagicButton } from "../ui/MagicButton"

export function CategoryFilter({
  categories = [], active = "All", onSelect
}) {

  const allCategories = ["All", ...categories.map((c) => c.name ?? c)];

  return (
    <div className="flex items-center gap-3 pb-2">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect?.category}
          className={`
            group whitespace-nowrap rounded-2xl border px-4 py-2 text-xs font-semibold transition cursor-pointer
            ${active === category
              ? "border-indigo-500 bg-indigo-500/50 text-white"
              : "border-white/10 bg-white/5 text-slate-300 hover:bg-indigo-500 hover:text-white"
            }
            `}
        >
          {category}
        </button>
      ))}

      <MagicButton>
        <FolderPlusIcon className="size-4" />
      </MagicButton>
    </div>
  )
}
