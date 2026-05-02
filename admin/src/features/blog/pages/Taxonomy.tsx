import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import {
    useCategoriesQuery,
    useCreateCategoryMutation,
    useCreateTagMutation,
    useDeleteCategoryMutation,
    useDeleteTagMutation,
    useTagsQuery,
} from '../hooks';
import { toast } from '@/hooks/useToast';

export default function Taxonomy() {
    return (
        <>
            <PageHeader
                title="Categories & tags"
                description="Organise posts into groups."
            />
            <div className="grid gap-4 lg:grid-cols-2">
                <CategoriesPanel />
                <TagsPanel />
            </div>
        </>
    );
}

function CategoriesPanel() {
    const list = useCategoriesQuery();
    const create = useCreateCategoryMutation();
    const remove = useDeleteCategoryMutation();
    const [name, setName] = useState('');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
                <form
                    className="flex gap-2"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!name.trim()) return;
                        try {
                            await create.mutateAsync({ name: name.trim() });
                            setName('');
                            toast.success('Category added');
                        } catch {
                            toast.error('Could not add category');
                        }
                    }}
                >
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New category"
                    />
                    <Button type="submit" size="sm" loading={create.isPending}>
                        <Plus className="h-4 w-4" />
                        Add
                    </Button>
                </form>
                {(list.data ?? []).length === 0 ? (
                    <EmptyState title="No categories yet" />
                ) : (
                    <ul className="divide-y divide-slate-100">
                        {(list.data ?? []).map((c) => (
                            <li key={c.id} className="flex items-center justify-between py-2">
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{c.name}</p>
                                    <p className="text-xs text-slate-500">/{c.slug}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (window.confirm(`Delete "${c.name}"?`))
                                            remove.mutate(c.id);
                                    }}
                                    className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                                    aria-label="Delete category"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </CardBody>
        </Card>
    );
}

function TagsPanel() {
    const list = useTagsQuery();
    const create = useCreateTagMutation();
    const remove = useDeleteTagMutation();
    const [name, setName] = useState('');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
                <form
                    className="flex gap-2"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!name.trim()) return;
                        try {
                            await create.mutateAsync({ name: name.trim() });
                            setName('');
                            toast.success('Tag added');
                        } catch {
                            toast.error('Could not add tag');
                        }
                    }}
                >
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New tag"
                    />
                    <Button type="submit" size="sm" loading={create.isPending}>
                        <Plus className="h-4 w-4" />
                        Add
                    </Button>
                </form>
                {(list.data ?? []).length === 0 ? (
                    <EmptyState title="No tags yet" />
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {(list.data ?? []).map((t) => (
                            <span
                                key={t.id}
                                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs"
                            >
                                {t.name}
                                <button
                                    type="button"
                                    aria-label="Delete tag"
                                    onClick={() => {
                                        if (window.confirm(`Delete "${t.name}"?`))
                                            remove.mutate(t.id);
                                    }}
                                    className="text-slate-400 hover:text-red-600"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </CardBody>
        </Card>
    );
}
