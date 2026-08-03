import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "onDark" | "ghostDark";
  size?: "sm" | "md" | "lg";
  as?: React.ElementType;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", as: Component = "button", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none";

    const sizes = {
      sm: "h-8  px-4   text-[12px] rounded-[var(--radius-pill)]",
      md: "h-10 px-5   text-[13px] rounded-[var(--radius-pill)]",
      lg: "h-12 px-7   text-[14px] rounded-[var(--radius-pill)]",
    };

    const variants = {
      primary:   "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] active:bg-[var(--color-accent-hover)]",
      secondary: "bg-[var(--color-ink)] text-[var(--color-bg)] hover:bg-[var(--color-ink-2)] active:bg-[var(--color-ink-2)]",
      outline:   "bg-transparent text-[var(--color-ink)] border border-[var(--color-border-strong)] hover:border-[var(--color-ink)] hover:bg-[var(--color-surface-warm)]",
      ghost:     "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface-warm)]",
      onDark:    "bg-[var(--color-bg)] text-[var(--color-ink)] hover:bg-[#F5EFE6]",
      ghostDark: "bg-transparent text-[var(--color-bg)] border border-[var(--color-bg)]/30 hover:bg-[var(--color-bg)]/10 hover:border-[var(--color-bg)]/60",
    };

    return (
      <Component ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props}>
        {children}
      </Component>
    );
  }
);
Button.displayName = "Button";
