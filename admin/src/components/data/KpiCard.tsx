import type { ReactNode } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Props {
    label: string;
    value: string;
    deltaPct?: number | null;
    deltaSuffix?: string;
    icon: ReactNode;
    iconTone?: 'emerald' | 'blue' | 'amber' | 'violet';
    className?: string;
}

const TONES: Record<NonNullable<Props['iconTone']>, string> = {
    emerald: 'bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100',
    blue: 'bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100',
    amber: 'bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-100',
    violet: 'bg-violet-50 text-violet-600 ring-1 ring-inset ring-violet-100',
};

export function KpiCard({
    label,
    value,
    deltaPct,
    deltaSuffix = 'vs last month',
    icon,
    iconTone = 'emerald',
    className,
}: Props) {
    const hasDelta = typeof deltaPct === 'number';
    const positive = (deltaPct ?? 0) >= 0;
    return (
        <div
            className={cn(
                'flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_2px_8px_rgba(15,23,42,0.06)]',
                className,
            )}
        >
            <span
                className={cn(
                    'grid h-11 w-11 shrink-0 place-items-center rounded-xl',
                    TONES[iconTone],
                )}
            >
                {icon}
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    {label}
                </p>
                <div className="mt-0.5 flex items-baseline gap-2">
                    <p className="text-2xl font-semibold tracking-tight tabular-nums text-slate-900">
                        {value}
                    </p>
                    {hasDelta && (
                        <span
                            className={cn(
                                'inline-flex items-center gap-0.5 rounded-md px-1 text-[11px] font-medium tabular-nums',
                                positive
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-red-50 text-red-700',
                            )}
                        >
                            {positive ? (
                                <ArrowUp className="h-3 w-3" />
                            ) : (
                                <ArrowDown className="h-3 w-3" />
                            )}
                            {Math.abs(deltaPct ?? 0)}%
                        </span>
                    )}
                </div>
                <p className="mt-0.5 text-[11px] text-slate-400">{deltaSuffix}</p>
            </div>
        </div>
    );
}
