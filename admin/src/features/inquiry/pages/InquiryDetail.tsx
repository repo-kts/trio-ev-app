import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Globe, Mail, Phone, Send } from 'lucide-react';
import { INQUIRY_STATUSES, type InquiryStatus } from '@trio/shared/inquiry';
import { Drawer } from '@/components/ui/Drawer';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Avatar } from '@/components/ui/Avatar';
import { StatusBadge } from '../StatusBadge';
import { useInquiryQuery, useSendReplyMutation, useUpdateInquiryMutation } from '../hooks';
import { toast } from '@/hooks/useToast';

interface Props {
    id: string | undefined;
    open: boolean;
    onClose: () => void;
}

export function InquiryDetailDrawer({ id, open, onClose }: Props) {
    const query = useInquiryQuery(id);
    const updateMutation = useUpdateInquiryMutation(id ?? '');
    const replyMutation = useSendReplyMutation(id ?? '');

    const inquiry = query.data;

    const [replySubject, setReplySubject] = useState('');
    const [replyBody, setReplyBody] = useState('');

    const inquirySubject = inquiry?.subject;
    useEffect(() => {
        if (!inquirySubject) return;
        setReplySubject((prev) => prev || `Re: ${inquirySubject}`);
    }, [inquirySubject]);

    useEffect(() => {
        if (!open) {
            setReplySubject('');
            setReplyBody('');
        }
    }, [open]);

    const drawerTitle = inquiry ? (
        <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
                    {inquiry.name}
                </h2>
                <StatusBadge status={inquiry.status} />
            </div>
            <p className="text-[11px] text-slate-500">
                Received {format(new Date(inquiry.createdAt), 'd MMM yyyy, HH:mm')}
            </p>
        </div>
    ) : query.isLoading ? (
        <div className="space-y-1.5">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-56" />
        </div>
    ) : null;

    return (
        <Drawer open={open} onClose={onClose} width="md" title={drawerTitle}>
            {!inquiry && query.isLoading && (
                <div className="space-y-3">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            )}

            {inquiry && (
                <div className="space-y-3">
                    <section className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
                        <div className="flex items-start gap-3">
                            <Avatar name={inquiry.name} size="md" />
                            <div className="min-w-0 flex-1 space-y-1.5 text-sm">
                                <ContactRow icon={<Mail className="h-3.5 w-3.5" />}>
                                    <a
                                        href={`mailto:${inquiry.email}`}
                                        className="break-all hover:underline"
                                    >
                                        {inquiry.email}
                                    </a>
                                </ContactRow>
                                {inquiry.phone && (
                                    <ContactRow icon={<Phone className="h-3.5 w-3.5" />}>
                                        <a
                                            href={`tel:${inquiry.phone.replace(/\s+/g, '')}`}
                                            className="hover:underline"
                                        >
                                            {inquiry.phone}
                                        </a>
                                    </ContactRow>
                                )}
                                <ContactRow icon={<Globe className="h-3.5 w-3.5" />}>
                                    Source: {inquiry.source ?? '—'}
                                </ContactRow>
                            </div>
                            <div className="w-32 shrink-0">
                                <label className="mb-1 block text-[11px] font-medium text-slate-600">
                                    Status
                                </label>
                                <Select
                                    value={inquiry.status}
                                    onChange={(e) =>
                                        updateMutation.mutate(
                                            { status: e.target.value as InquiryStatus },
                                            {
                                                onError: () =>
                                                    toast.error('Could not update status'),
                                                onSuccess: () => toast.success('Status updated'),
                                            },
                                        )
                                    }
                                    disabled={updateMutation.isPending}
                                >
                                    {INQUIRY_STATUSES.map((s) => (
                                        <option key={s} value={s}>
                                            {s.replace('_', ' ')}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
                        <p className="mb-1.5 text-sm font-semibold text-slate-900 break-words">
                            {inquiry.subject}
                        </p>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Message
                        </p>
                        <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700">
                            {inquiry.message}
                        </p>
                    </section>

                    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between gap-2 bg-slate-800 px-3 py-2 text-white">
                            <span className="text-sm font-semibold">New Reply</span>
                            <span className="text-[11px] text-slate-300">
                                via {inquiry.email}
                            </span>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <div className="flex items-center gap-2 px-3 py-2 text-sm">
                                <span className="w-14 shrink-0 text-xs text-slate-500">To</span>
                                <span className="min-w-0 flex-1 truncate rounded bg-slate-50 px-2 py-1 text-slate-700">
                                    {inquiry.name} &lt;{inquiry.email}&gt;
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 text-sm">
                                <span className="w-14 shrink-0 text-xs text-slate-500">
                                    Subject
                                </span>
                                <Input
                                    value={replySubject}
                                    onChange={(e) => setReplySubject(e.target.value)}
                                    placeholder="Subject"
                                    className="h-8 border-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                            <Textarea
                                value={replyBody}
                                onChange={(e) => setReplyBody(e.target.value)}
                                placeholder="Write your reply…"
                                rows={8}
                                className="min-h-[160px] resize-y rounded-none border-0 px-3 py-2 text-sm shadow-none focus-visible:ring-0"
                            />
                        </div>
                        <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50 px-3 py-2">
                            <span className="text-[11px] text-slate-500">
                                {replyBody.length}/20000
                            </span>
                            <Button
                                size="sm"
                                loading={replyMutation.isPending}
                                disabled={!replySubject.trim() || !replyBody.trim()}
                                onClick={() =>
                                    replyMutation.mutate(
                                        {
                                            subject: replySubject.trim(),
                                            body: replyBody.trim(),
                                        },
                                        {
                                            onSuccess: () => {
                                                setReplyBody('');
                                                toast.success('Reply sent');
                                            },
                                            onError: (err) => {
                                                const msg =
                                                    (err as { response?: { data?: { message?: string } } })
                                                        ?.response?.data?.message ??
                                                    'Could not send reply';
                                                toast.error(msg);
                                            },
                                        },
                                    )
                                }
                            >
                                <Send className="mr-1.5 h-3.5 w-3.5" />
                                Send
                            </Button>
                        </div>
                    </section>

                    <section className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
                        <p className="mb-2 text-xs font-semibold text-slate-900">
                            Sent Replies ({(inquiry.replies ?? []).length})
                        </p>
                        <ul className="space-y-3">
                            {(inquiry.replies ?? []).map((reply) => (
                                <li
                                    key={reply.id}
                                    className="rounded border border-slate-100 bg-slate-50/60 p-3"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                                        <span className="font-medium text-slate-700">
                                            {reply.author?.name ?? reply.author?.email}
                                        </span>
                                        <span>
                                            {format(
                                                new Date(reply.sentAt),
                                                'd MMM yyyy, HH:mm',
                                            )}
                                        </span>
                                    </div>
                                    <p className="mt-1 break-words text-sm font-medium text-slate-900">
                                        {reply.subject}
                                    </p>
                                    <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-700">
                                        {reply.body}
                                    </p>
                                </li>
                            ))}
                            {(inquiry.replies ?? []).length === 0 && (
                                <li className="text-sm text-slate-500">No replies sent yet.</li>
                            )}
                        </ul>
                    </section>
                </div>
            )}
        </Drawer>
    );
}

function ContactRow({
    icon,
    children,
}: {
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-2 text-slate-700">
            <span className="text-slate-400">{icon}</span>
            <span className="min-w-0 flex-1 truncate">{children}</span>
        </div>
    );
}
