import React from "react"
import { Button } from "../ui/Button"

export function Timeline({ children }) {

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-xs font-semibold text-slate-400">
            TIMELINE
          </p>

          <h2 className="text-lg font-bold text-white">
            Today
          </h2>
        </div>

        <Button variant="outline">
          + ADD
        </Button>

      </div>

      <div className="space-y-6">
        {children}
      </div>

    </div>
  )
}