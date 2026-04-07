import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 min-h-12 px-5',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-blue-800',
        secondary: 'bg-white text-foreground border-2 border-slate-300 hover:bg-slate-100',
        ghost: 'text-foreground hover:bg-slate-100',
        danger: 'bg-red-700 text-white hover:bg-red-800'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
