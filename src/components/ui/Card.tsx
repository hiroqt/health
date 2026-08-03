import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, as: Component = "div", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "bg-[#F5EFE6] border border-[var(--color-brand-border)] rounded-[var(--radius-card)] overflow-hidden",
          "shadow-[var(--shadow-card-rest)] transition-all duration-500 ease-out",
          "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#dcdcdc]",
          "flex flex-col",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

export const CardFigure = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-8 bg-[var(--color-neutral)] border-b border-[var(--color-brand-border)]", className)}
      {...props}
    />
  )
);
CardFigure.displayName = "CardFigure";

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-10 flex flex-col gap-4 flex-1", className)}
      {...props}
    />
  )
);
CardBody.displayName = "CardBody";

export const CardMeta = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-baseline justify-between gap-6 mt-auto pt-6 border-t border-[var(--color-brand-border)]",
        "text-xs tracking-[0.14em] uppercase text-gray-500 font-medium",
        className
      )}
      {...props}
    />
  )
);
CardMeta.displayName = "CardMeta";
