import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export const Textarea = forwardRef<
    HTMLTextAreaElement,
    TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...rest }, ref) => (
    <textarea
        ref={ref}
        className={cn(
            'flex min-h-[88px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-[border-color,box-shadow] placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60',
            className,
        )}
        {...rest}
    />
));
Textarea.displayName = 'Textarea';
