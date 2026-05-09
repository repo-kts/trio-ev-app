import { useState } from 'react';
import { MailCheck, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { toast } from '@/hooks/useToast';
import { useSettingsQuery, useUpdateSettingsMutation } from '@/features/settings/hooks';
import { useTemplatesQuery } from '@/features/auto-reply/hooks';
import { TemplatesManagerModal } from '@/features/auto-reply/TemplatesManager';

export function ReplyAllCard() {
    const settings = useSettingsQuery();
    const update = useUpdateSettingsMutation();
    const templates = useTemplatesQuery();
    const [open, setOpen] = useState(false);

    const enabled = settings.data?.autoReplyEnabled ?? false;
    const activeTpl = (templates.data ?? []).find((t) => t.active);

    const onToggle = async () => {
        if (!settings.data) return;
        if (!enabled && !activeTpl) {
            toast.error('Activate a template first');
            setOpen(true);
            return;
        }
        try {
            await update.mutateAsync({ autoReplyEnabled: !enabled });
            toast.success(!enabled ? 'Auto-reply enabled' : 'Auto-reply disabled');
        } catch {
            toast.error('Could not update auto-reply');
        }
    };

    return (
        <>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span
                    className={cn(
                        'grid h-12 w-12 shrink-0 place-items-center rounded-xl',
                        enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400',
                    )}
                >
                    <MailCheck className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-slate-500">Reply All</p>
                        <Toggle checked={enabled} onChange={onToggle} disabled={update.isPending} />
                    </div>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">
                        {enabled ? 'Auto-reply ON' : 'Auto-reply OFF'}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="truncate text-[11px] text-slate-500">
                            Active: {activeTpl?.name ?? 'none'}
                        </span>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-[11px]"
                            onClick={() => setOpen(true)}
                        >
                            <Settings2 className="h-3 w-3" />
                            Manage templates
                        </Button>
                    </div>
                </div>
            </div>

            <TemplatesManagerModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}

function Toggle({
    checked,
    onChange,
    disabled,
}: {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={onChange}
            className={cn(
                'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                checked ? 'bg-emerald-500' : 'bg-slate-300',
            )}
        >
            <span
                className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
                    checked ? 'translate-x-4' : 'translate-x-0.5',
                )}
            />
        </button>
    );
}
