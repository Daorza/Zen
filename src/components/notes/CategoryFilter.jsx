import { FolderPlusIcon } from "@heroicons/react/24/solid";
import { Trash2, X } from "lucide-react";  // fix: import Trash2
import { MagicButton } from "../ui/MagicButton";

export function CategoryFilter({
  categories = [], active = "All", onSelect, onOpenAddCategory, onDeleteCategory
}) {
  const allCategories = ["All", ...categories.map((c) => c.name ?? c)];

  return (
    <div className="flex items-center gap-3 pb-2">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect?.(category)}
          className={`
            group whitespace-nowrap rounded-2xl border px-4 py-2 text-xs font-semibold transition cursor-pointer
            ${active === category
              ? "border-indigo-500 bg-indigo-500/50 text-white"
              : "border-slate-200 bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-indigo-500 dark:hover:text-white"
            }
          `}
        >
          {category}
          {category !== "All" && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onDeleteCategory?.(category);
              }}
              className="ml-2 text-slate-400 hover:text-red-400 inline-flex cursor-pointer items-center"
            >
              <X size={12} className="items-center" />
            </div>
          )}
        </button>
      ))}
      <MagicButton onClick={onOpenAddCategory}>
        <FolderPlusIcon className="size-4" />
      </MagicButton>
    </div>
  );
}