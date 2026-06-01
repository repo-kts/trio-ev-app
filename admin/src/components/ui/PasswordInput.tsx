import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/cn';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
    ({ className, ...rest }, ref) => {
        const [show, setShow] = useState(false);
        return (
            <div className="relative">
                <input
                    ref={ref}
                    type={show ? 'text' : 'password'}
                    className={cn(
                        'flex h-9 w-full rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-[border-color,box-shadow] placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60',
                        className,
                    )}
                    {...rest}
                />
                <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    tabIndex={-1}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 grid w-9 place-items-center text-slate-400 transition-colors hover:text-slate-600"
                >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
        );
    },
);
PasswordInput.displayName = 'PasswordInput';
