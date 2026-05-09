import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { INQUIRY_STATUSES, type InquiryStatus } from '@trio/shared/inquiry';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/cn';

interface Props {
    value: InquiryStatus;
    onChange: (next: InquiryStatus) => void;
    disabled?: boolean;
}

export function InlineStatusSelect({ value, onChange, disabled }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onDoc = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('mousedown', onDoc);
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('mousedown', onDoc);
            window.removeEventListener('keydown', onKey);
        };
    }, [open]);

    return (
        <div className="relative inline-block" ref={ref} onClick={(e) => e.stopPropagation()}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-1 rounded-full transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <StatusBadge status={value} />
                <ChevronDown
                    className={cn(
                        'h-3 w-3 text-slate-400 transition-transform',
                        open && 'rotate-180',
                    )}
                />
            </button>
            {open && (
                <ul
                    role="listbox"
                    className="absolute left-0 top-full z-30 mt-1 min-w-[160px] overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg"
                >
                    {INQUIRY_STATUSES.map((s) => {
                        const active = s === value;
                        return (
                            <li key={s}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => {
                                        if (!active) onChange(s);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        'flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-xs',
                                        active
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'text-slate-700 hover:bg-slate-50',
                                    )}
                                >
                                    <StatusBadge status={s} />
                                    {active && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
