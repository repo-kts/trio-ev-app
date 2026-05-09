import { ChevronDown, LogOut, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useMe } from '@/features/auth/hooks';
import { logout } from '@/features/auth/api';
import { toast } from '@/hooks/useToast';
import { cn } from '@/lib/cn';

interface Props {
    onOpenSidebar?: () => void;
}

export function Topbar({ onOpenSidebar }: Props = {}) {
    const me = useMe();
    const nav = useNavigate();
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

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast.success('Signed out');
            nav('/login', { replace: true });
        },
    });

    const initial = (me.data?.name?.[0] ?? me.data?.email?.[0] ?? 'A').toUpperCase();
    const display = me.data?.name ?? me.data?.email ?? 'Admin';

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/90 px-3 backdrop-blur sm:px-6">
            <div>
                {onOpenSidebar && (
                    <button
                        type="button"
                        onClick={onOpenSidebar}
                        className="-ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                )}
            </div>

            <div className="relative" ref={ref}>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full border border-transparent py-1 pl-1 pr-2 text-sm transition-colors hover:border-slate-200 hover:bg-slate-50"
                    aria-haspopup="menu"
                    aria-expanded={open}
                >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                        {initial}
                    </span>
                    <span className="hidden max-w-[140px] truncate font-medium text-slate-700 sm:inline">
                        {display}
                    </span>
                    <ChevronDown
                        className={cn(
                            'h-3.5 w-3.5 text-slate-500 transition-transform',
                            open && 'rotate-180',
                        )}
                    />
                </button>
                {open && (
                    <div
                        role="menu"
                        className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-lg ring-1 ring-black/5"
                    >
                        <div className="border-b border-slate-100 px-3 py-2.5">
                            <p className="truncate text-sm font-medium text-slate-900">
                                {display}
                            </p>
                            {me.data?.email && (
                                <p className="truncate text-xs text-slate-500">{me.data.email}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => logoutMutation.mutate()}
                            disabled={logoutMutation.isPending}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <LogOut className="h-4 w-4 text-slate-500" />
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
