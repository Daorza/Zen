import ProgressBar from "../../components/ui/Progressbar";
import { BoltIcon, CheckCircleIcon, ClockIcon, SunIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";


export function DayProgressWidget({
  progress = 30,
  done = 12,
  active = 4,
  total = 16,
  hours = "20h"
}) {

  return (
    <div className="space-y-4">

      <div className="flex justify-between text-sm font-bold uppercase tracking-wide">
        <span className="text-slate-400 flex items-center gap-2">
          <SunIcon className="size-5 stroke-amber-500 fill-amber-500" />
          day progress
        </span>
        <span className="text-indigo-400">{progress}%</span>
      </div>

      <ProgressBar value={progress} />

      <div className="flex justify-around gap-4 text-xs text-slate-400 *:flex *:gap-2 *:items-center">

        <span className="">
          <CheckCircleIcon className="size-4 stroke-emerald-500"/>
          Done {done}
        </span>

        <span className="">
          <BoltIcon className="size-4 stroke-indigo-500"/> 
          Active {active}
        </span>

        <span className="">
          <ArchiveBoxIcon className="size-4"/>
          Total 
          <span className="font-bold">
            {total}
          </span>
        </span>

        <span className="">
          <ClockIcon className="size-4 opacity-50"/>
          {hours}
        </span>

      </div>

    </div>
  )
}