import { useRef } from 'react';
import { Trash2, UploadCloud } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import {
    useDeleteMediaMutation,
    useMediaQuery,
    useUploadMediaMutation,
} from '../hooks';
import { mediaUrl } from '../mediaUrl';
import { toast } from '@/hooks/useToast';

export default function MediaLibrary() {
    const fileInput = useRef<HTMLInputElement>(null);
    const query = useMediaQuery('IMAGE');
    const upload = useUploadMediaMutation();
    const remove = useDeleteMediaMutation();

    const handleFiles = async (files: FileList | null) => {
        if (!files) return;
        for (const f of Array.from(files)) {
            try {
                await upload.mutateAsync({ file: f });
            } catch {
                toast.error(`Upload failed: ${f.name}`);
            }
        }
        toast.success('Upload complete');
    };

    return (
        <>
            <PageHeader
                title="Media"
                description="Images used across blog posts."
                actions={
                    <Button
                        size="sm"
                        loading={upload.isPending}
                        onClick={() => fileInput.current?.click()}
                    >
                        <UploadCloud className="h-4 w-4" />
                        Upload
                    </Button>
                }
            />
            <input
                ref={fileInput}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                    void handleFiles(e.target.files);
                    e.target.value = '';
                }}
            />
            <Card>
                <CardBody>
                    {query.isLoading ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <Skeleton key={i} className="aspect-square w-full" />
                            ))}
                        </div>
                    ) : (query.data ?? []).length === 0 ? (
                        <EmptyState
                            title="No media uploaded"
                            description="Click Upload to add images."
                        />
                    ) : (
                        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                            {(query.data ?? []).map((m) => (
                                <li
                                    key={m.id}
                                    className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                                >
                                    <img
                                        src={mediaUrl(m.thumbUrl ?? m.url)}
                                        alt={m.alt ?? ''}
                                        loading="lazy"
                                        className="aspect-square w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        aria-label="Delete"
                                        onClick={() => {
                                            if (window.confirm('Delete image?'))
                                                remove.mutate(m.id);
                                        }}
                                        className="absolute right-1 top-1 hidden rounded bg-white/90 p-1 text-red-600 hover:bg-white group-hover:block"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardBody>
            </Card>
        </>
    );
}
