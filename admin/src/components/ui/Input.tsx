import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...rest }, ref) => (
        <input
            ref={ref}
            className={cn(
                'flex h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-[border-color,box-shadow] placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60',
                className,
            )}
            {...rest}
        />
    ),
);
Input.displayName = 'Input';
