import React from "react"
import { cn } from "@/lib/utils" // Assuming you use a utility function for class names

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn("base-input-styles", className)} {...props} />
  }
)

Input.displayName = "Input"

export { Input }