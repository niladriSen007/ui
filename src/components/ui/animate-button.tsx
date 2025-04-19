"use client"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"
import { buttonVariants } from "./button"
import { cva, VariantProps } from "class-variance-authority"

const animateButtonVariants = cva(
  " cursor-pointer relative group rounded-md text-sm shadow[0px_1px_2px_0px_rgba(255,255,2555,0.1)_inset,0px_-1px_2px_0px_rgba(255,255,2555,0.1)_inset] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground dark:focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary-foreground/50 text-primary shadow-xs hover:bg-primary-foreground/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        animate:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 animate-pulse",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const AnimateButton = ({
  label,
  variant,
  size,
  className,
  ...props
}: Omit<HTMLMotionProps<"button">, "children"> & {
  label: string
} & VariantProps<typeof buttonVariants>) => {
  return (
    <motion.button
      initial={{
        rotate: 0,
      }}
      animate={{
        transition: {
          duration: 0.2,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.1,
        rotateY: 10,
        boxShadow: "0px 20px 50px rgba(8, 112, 184, 0.6)",
      }}
      whileTap={{ scale: 0.9 }}
      className={cn(animateButtonVariants({ variant, size, className }))}
      {...props}
    >
      {label}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto"></span>
      <span className="absolute opacity-0 group-hover:opacity-100 duration-300 transition-opacity inset-x-0 bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[6px] w-full mx-auto blur-sm"></span>
    </motion.button>
  )
}

export default AnimateButton
