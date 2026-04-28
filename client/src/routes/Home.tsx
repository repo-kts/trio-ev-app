import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

type HealthResponse = { status: string; uptime: number };

export function Home() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['health'],
        queryFn: async () => (await api.get<HealthResponse>('/health')).data,
    });

    return (
        <section className="space-y-3">
            <h1 className="text-2xl font-semibold">Trio</h1>
            <p className="text-slate-600">Vite + React + TanStack Query + Tailwind.</p>
            <div className="rounded border border-slate-200 p-4 text-sm">
                <h2 className="mb-2 font-medium">Server health</h2>
                {isLoading && <p>Loading…</p>}
                {isError && <p className="text-red-600">{(error as Error).message}</p>}
                {data && <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>}
            </div>
        </section>
    );
}
