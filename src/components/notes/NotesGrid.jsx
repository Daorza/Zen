import { desc, title } from "motion/react-client"
import { NotesCard } from "./NotesCard"

export function NotesGrid() {

  const notes = [
    {
      title: "Catatan Hari Ini",
      description: "Hari Ini Menulis Catatan",
      date: "12 Maret 2023",
    },
    {
      title:"Note 2",
      description:"this is note 2 and this is also the description of note 2",
      date:"12 Mar 2026"
    }
  ]
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note, index) => (
        <NotesCard key={index} {...note} />
      ))}
    </div>
  )
}
