import { useRef, useState } from "react";
import { CategoryFilter } from "../../components/notes/CategoryFilter";
import { NotesGrid } from "../../components/notes/NotesGrid";
import { MagicButton } from "../../components/ui/MagicButton";
import { PlusIcon } from "@heroicons/react/24/outline";
import Modal from "../../components/ui/Modal";
import { Textarea, TextInput } from "../../components/ui/Input";
import SearchBar from "../../components/ui/SearchBar";

const categories = ["Personal", "Work", "Learning", "Finance"];

export default function NotesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Modal title={"NEW NOTE"} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {/* BODY */}
        <div className="space-y-6 p-6">
          <TextInput
            placeholder="Judul"
            name="title"
          // value={payload.title}
          // onChange={handleChange}
          />

          <Textarea
            placeholder="Deskripsi"
            name="description"
          // value={payload.description}
          // onChange={handleChange}
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
            onClick={() => setModalOpen(false)}
            className="rounded-2xl bg-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/20 cursor-pointer">
            Cancel
          </button>

          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 cursor-pointer">
            Save Note
          </button>
        </div>
      </Modal>


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

          <MagicButton className="flex items-center gap-2" onClick={() => setModalOpen(true)}>
            <PlusIcon className="size-6" />
            Tambah Catatan
          </MagicButton>
        </div>

        <SearchBar />
        <CategoryFilter />
        <NotesGrid />
      </div>
    </>
  );
}
