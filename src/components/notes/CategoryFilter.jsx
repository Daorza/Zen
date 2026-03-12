import { FolderPlusIcon } from "@heroicons/react/24/solid"
import { MagicButton } from "../ui/MagicButton"

const categories = [
  "All",
  "Personal",
  "Work",
  "Learning",
  "Finance",
]

export function CategoryFilter() {
  return (
    <div className="flex items-center gap-3 pb-2">
      {categories.map((category, index) => (
        <button
          key={index}
          className="group whitespace-nowrap rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-indigo-500 hover:text-white cursor-pointer"
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
