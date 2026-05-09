import { useEffect, useState } from 'react';
import { Pencil, MailCheck } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/lib/cn';
import { toast } from '@/hooks/useToast';
import { useSettingsQuery, useUpdateSettingsMutation } from '@/features/settings/hooks';

export function ReplyAllCard() {
    const query = useSettingsQuery();
    const update = useUpdateSettingsMutation();

    const [editOpen, setEditOpen] = useState(false);
    const [draftSubject, setDraftSubject] = useState('');
    const [draftBody, setDraftBody] = useState('');

    useEffect(() => {
        if (!query.data) return;
        setDraftSubject(query.data.autoReplySubject);
        setDraftBody(query.data.autoReplyBody);
    }, [query.data]);

    const enabled = query.data?.autoReplyEnabled ?? false;

    const onToggle = async () => {
        if (!query.data) return;
        try {
            await update.mutateAsync({ autoReplyEnabled: !enabled });
            toast.success(!enabled ? 'Auto-reply enabled' : 'Auto-reply disabled');
        } catch {
            toast.error('Could not update auto-reply');
        }
    };

    const onSave = async () => {
        try {
            await update.mutateAsync({
                autoReplySubject: draftSubject.trim(),
                autoReplyBody: draftBody.trim(),
            });
            toast.success('Auto-reply updated');
            setEditOpen(false);
        } catch {
            toast.error('Could not save auto-reply');
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
                    <button
                        type="button"
                        onClick={() => setEditOpen(true)}
                        className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 hover:text-emerald-700"
                    >
                        <Pencil className="h-3 w-3" />
                        Edit message
                    </button>
                </div>
            </div>

            <Modal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                title="Edit auto-reply message"
            >
                <div className="space-y-3">
                    <p className="text-xs text-slate-500">
                        Sent to inquirers when Reply All is ON. Use <code>{'{{name}}'}</code> and{' '}
                        <code>{'{{subject}}'}</code> to personalise.
                    </p>
                    <label className="block space-y-1">
                        <span className="text-xs font-medium text-slate-600">Subject</span>
                        <Input
                            value={draftSubject}
                            onChange={(e) => setDraftSubject(e.target.value)}
                        />
                    </label>
                    <label className="block space-y-1">
                        <span className="text-xs font-medium text-slate-600">Body</span>
                        <Textarea
                            rows={8}
                            value={draftBody}
                            onChange={(e) => setDraftBody(e.target.value)}
                        />
                    </label>
                    <div className="flex justify-end gap-2 pt-1">
                        <Button variant="ghost" onClick={() => setEditOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={onSave}
                            loading={update.isPending}
                            disabled={!draftSubject.trim() || !draftBody.trim()}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
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
