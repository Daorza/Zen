import React from 'react'
import { cn } from '../../lib/cn.jsx'

export function Button({className, children, variant = "primary", ...props}) {
  return (
    <button 
    {...props}
    className={cn(
        "relative inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
        variant === "primary" && 
            "bg-primary-900 text-white hover:bg-primary-600",
        variant === "secondary" && 
            "bg-gray-500 text-white hover:bg-gray-600",
        variant === "disabled" && 
            "bg-gray-300 text-gray-500 cursor-not-allowed",
        variant === "outline" && 
            "border border-gray-500 text-gray-500 hover:bg-gray-100",
        className
    )}>
        { children }
    </button>
  )
}
