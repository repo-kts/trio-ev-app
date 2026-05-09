import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface TabItem<T extends string> {
    value: T;
    label: string;
    count?: number;
}

interface Props<T extends string> {
    items: TabItem<T>[];
    value: T;
    onChange: (value: T) => void;
    className?: string;
}

export function Tabs<T extends string>({ items, value, onChange, className }: Props<T>) {
    return (
        <>
            <div className={cn('md:hidden', className)}>
                <TabsDropdown items={items} value={value} onChange={onChange} />
            </div>
            <div
                role="tablist"
                className={cn(
                    'hidden items-center gap-6 border-b border-slate-200 md:flex',
                    className,
                )}
            >
                {items.map((item) => {
                    const active = item.value === value;
                    const hasCount = typeof item.count === 'number';
                    return (
                        <button
                            key={item.value}
                            role="tab"
                            aria-selected={active}
                            type="button"
                            onClick={() => onChange(item.value)}
                            className={cn(
                                'group relative -mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 pb-3 pt-1 text-xs font-semibold uppercase tracking-wider transition-colors',
                                active
                                    ? 'border-emerald-500 text-emerald-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-800',
                            )}
                        >
                            {item.label}
                            {hasCount && (
                                <span
                                    className={cn(
                                        'inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold tabular-nums transition-colors',
                                        active
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700',
                                    )}
                                >
                                    {item.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </>
    );
}

function TabsDropdown<T extends string>({ items, value, onChange }: Props<T>) {
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

    const current = items.find((i) => i.value === value) ?? items[0];

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex w-full items-center justify-between gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="inline-flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                        {current?.label}
                    </span>
                    {typeof current?.count === 'number' && (
                        <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[10px] font-semibold text-white tabular-nums">
                            {current.count}
                        </span>
                    )}
                </span>
                <ChevronDown
                    className={cn('h-4 w-4 text-slate-500 transition-transform', open && 'rotate-180')}
                />
            </button>
            {open && (
                <ul
                    role="listbox"
                    className="absolute left-0 right-0 z-30 mt-1 max-h-72 overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg"
                >
                    {items.map((item) => {
                        const active = item.value === value;
                        return (
                            <li key={item.value}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => {
                                        onChange(item.value);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        'flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm',
                                        active
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'text-slate-700 hover:bg-slate-50',
                                    )}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        {active ? (
                                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                                        ) : (
                                            <span className="h-3.5 w-3.5" />
                                        )}
                                        <span className="text-xs font-semibold uppercase tracking-wider">
                                            {item.label}
                                        </span>
                                    </span>
                                    {typeof item.count === 'number' && (
                                        <span
                                            className={cn(
                                                'inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold tabular-nums',
                                                active
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-slate-100 text-slate-500',
                                            )}
                                        >
                                            {item.count}
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
