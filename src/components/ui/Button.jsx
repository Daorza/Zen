import React from 'react'
import { cn } from '../../lib/cn.jsx'

export function Button({className, children, variant = "primary", ...props}) {
  return (
    <button 
    {...props}
    className={cn(
        "relative inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer tracking-wide",
        variant === "primary" && 
            "bg-primary-900 text-white hover:bg-primary-600",
        variant === "secondary" && 
            "bg-mist-50 text-mist-950",
        variant === "disabled" && 
            "bg-gray-300 text-gray-500 cursor-not-allowed",
        variant === "outline" && 
            "border border-gray-400 text-gray-400 hover:bg-gray-100",
        className
    )}>
        { children }
    </button>
  )
}
