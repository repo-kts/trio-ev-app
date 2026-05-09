import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Props {
    page: number;
    total: number;
    limit: number;
    onChange: (page: number) => void;
    className?: string;
}

function buildPageList(page: number, totalPages: number): (number | 'ellipsis')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const result: (number | 'ellipsis')[] = [1];
    if (page > 3) result.push('ellipsis');
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) result.push(i);
    if (page < totalPages - 2) result.push('ellipsis');
    result.push(totalPages);
    return result;
}

const navBtn =
    'inline-flex h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50';

export function Pagination({ page, total, limit, onChange, className }: Props) {
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(total, page * limit);
    const pages = buildPageList(page, totalPages);

    return (
        <div
            className={cn(
                'flex flex-col items-start gap-3 px-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between',
                className,
            )}
        >
            <p className="text-xs tabular-nums text-slate-500">
                Showing <span className="font-medium text-slate-700">{start}</span>–
                <span className="font-medium text-slate-700">{end}</span> of{' '}
                <span className="font-medium text-slate-700">{total}</span>
            </p>
            <nav className="flex items-center gap-1" aria-label="Pagination">
                <button
                    type="button"
                    onClick={() => onChange(Math.max(1, page - 1))}
                    disabled={page <= 1}
                    className={navBtn}
                >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Previous</span>
                </button>
                {pages.map((p, idx) =>
                    p === 'ellipsis' ? (
                        <span key={`e${idx}`} className="px-1.5 text-xs text-slate-400">
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            type="button"
                            onClick={() => onChange(p)}
                            aria-current={p === page ? 'page' : undefined}
                            className={cn(
                                'h-8 min-w-[32px] rounded-lg px-2 text-xs font-medium tabular-nums transition-colors',
                                p === page
                                    ? 'bg-slate-900 text-white shadow-[0_1px_2px_rgba(15,23,42,0.2)]'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                            )}
                        >
                            {p}
                        </button>
                    ),
                )}
                <button
                    type="button"
                    onClick={() => onChange(Math.min(totalPages, page + 1))}
                    disabled={page >= totalPages}
                    className={navBtn}
                >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                </button>
            </nav>
        </div>
    );
}
