import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

const button = cva(
    'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium ring-offset-white transition-[background-color,color,box-shadow,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary:
                    'bg-emerald-600 text-white shadow-[0_1px_2px_rgba(16,185,129,0.3)] hover:bg-emerald-700',
                secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
                outline:
                    'border border-slate-200 bg-white text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900',
                ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                danger: 'bg-red-600 text-white shadow-[0_1px_2px_rgba(220,38,38,0.3)] hover:bg-red-700',
            },
            size: {
                sm: 'h-8 px-3 text-xs',
                md: 'h-9 px-3.5 text-sm',
                lg: 'h-10 px-5 text-sm',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: { variant: 'primary', size: 'md' },
    },
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof button> {
    loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, loading, disabled, children, ...rest }, ref) => (
        <button
            ref={ref}
            className={cn(button({ variant, size }), className)}
            disabled={disabled || loading}
            {...rest}
        >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {children}
        </button>
    ),
);
Button.displayName = 'Button';
