import { useRef } from "react";
import { NotesSearch } from "../../components/notes/NotesSearch";
import { CategoryFilter } from "../../components/notes/CategoryFilter";
import { NotesGrid } from "../../components/notes/NotesGrid";
import { MagicButton } from "../../components/ui/MagicButton";
import { PlusIcon } from "@heroicons/react/24/outline";

const categories = ["Personal", "Work", "Learning", "Finance"];

export default function NotesPage() {
    const modalRef = useRef(null);

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.checked = false;
        }
    }

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.checked = true;
        }
    }
  return (
    <>
      <input ref={modalRef} type="checkbox" id="new-note-modal" className="peer hidden" />
      <div
        onClick={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50
                  bg-slate-700/20 backdrop-blur-sm
                  opacity-0 pointer-events-none
                  transition
                  peer-checked:opacity-100
                  peer-checked:pointer-events-auto"
      >
        <div className="w-xl rounded-2xl border border-white/10 bg-slate-900 shadow-xl">

          <div className="flex items-center justify-center border-b border-white/10 p-6">
            <p className="text-sm font-bold tracking-wider text-slate-400">
              NEW NOTE
            </p>
          </div>

          {/* BODY */}
          <div className="space-y-6 p-6">
            <input
              type="text"
              placeholder="Note title..."
              className="w-full border-b border-white/10 bg-transparent pb-1 pl-1 text-lg text-white outline-none focus:border-indigo-500"
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
              <button 
                onClick={closeModal}
                className="rounded-2xl bg-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/20 cursor-pointer">
                Cancel
              </button>

            <button 
                onClick={() => {
                    // buat logic save note
                    closeModal();
                }}
                className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 cursor-pointer">
              Save Note
            </button>
          </div>
        </div>
      </div>


    <div className="w-full flex flex-col gap-6 p-4 sm:p-8 pb-28 md:pb-8">

      {/* header */}

      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900">
            Catatan
          </h1>

          <p className="font-medium text-slate-600 dark:text-white/40">
            Ingat tiap tulisanmu!
          </p>
        </div>

          <MagicButton className="flex items-center gap-2" onClick={openModal}>
            <PlusIcon className="size-6" />
            Tambah Catatan
          </MagicButton>
      </div>

      <NotesSearch />
      <CategoryFilter />
      <NotesGrid />
    </div>
    </>
  );
}
