import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MagicButton } from "../ui/MagicButton";

const categories = ["Personal", "Work", "Learning", "Finance"];

export function NewNoteModal() {
  return (
    <div className="w-130 rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <p className="text-xs font-semibold tracking-wider text-slate-400">
          NEW NOTE
        </p>

        <label htmlFor="new-note-modal">
          <MagicButton className="cursor-pointer">
            <XMarkIcon className="size-5 text-slate-400 hover:text-white" />
          </MagicButton>
        </label>
      </div>

      {/* BODY */}
      <div className="space-y-6 p-6">
        <input
          type="text"
          placeholder="Note title..."
          className="w-full border-b border-white/10 bg-transparent pb-2 text-lg text-white outline-none focus:border-indigo-500"
        />

        <textarea
          placeholder="Write your notes here..."
          className="h-32 w-full resize-none rounded-2xl bg-white/5 p-4 text-sm text-white outline-none focus:bg-white/10"
        />

        {/* CATEGORY */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400">CATEGORY</p>

          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 transition hover:bg-indigo-500 hover:text-white"
              >
                {category}
              </button>
            ))}

            <MagicButton className="flex items-center gap-2">
              <PlusIcon className="size-4" />
              Add
            </MagicButton>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-4 border-t border-white/10 p-6">
        <label htmlFor="new-note-modal">
          <button className="rounded-2xl bg-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/20">
            Cancel
          </button>
        </label>

        <button className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Save Note
        </button>
      </div>
    </div>
  );
}
