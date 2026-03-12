import { PlusIcon } from "@heroicons/react/24/outline";
import { MagicButton } from "../../components/ui/MagicButton";
import { NewNoteModal } from "./NewNoteModal";

export function NotesHeader() {
  return (
    <>
      <input type="checkbox" id="new-note-modal" className="peer hidden" />

      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900">
            Catatan
          </h1>

          <p className="font-medium text-slate-600 dark:text-white/40">
            Ingat tiap tulisanmu!
          </p>
        </div>

        <label htmlFor="new-note-modal" className="cursor-pointer">
            <MagicButton className="flex items-center gap-2">
                <PlusIcon className="size-6 text-slate-400 hover:text-white" />
                Tambah Catatan
            </MagicButton>
        </label>
      </div>

      <div
        className="fixed inset-0 flex items-center justify-center
            bg-black/60
            opacity-0 pointer-events-none
            transition
            peer-checked:opacity-100
            peer-checked:pointer-events-auto"
        >
        <div
          className="bg-slate-900 p-8 rounded-xl
                scale-95 opacity-0
                transition
                peer-checked:scale-100
                peer-checked:opacity-100"
        >
          <NewNoteModal />
        </div>
      </div>
    </>
  );
}
