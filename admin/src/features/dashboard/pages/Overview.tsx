import {
    CheckCircle2,
    Clock,
    MessageSquare,
    UserPlus,
} from 'lucide-react';
import { KpiCard } from '@/components/data/KpiCard';
import { HeroBanner } from '../components/HeroBanner';
import { StatusDonut } from '../components/StatusDonut';
import { MonthlyBar } from '../components/MonthlyBar';
import { TopSources } from '../components/TopSources';
import { RecentInquiries } from '../components/RecentInquiries';
import { useDashboardOverviewQuery } from '../hooks';

export default function Overview() {
    const query = useDashboardOverviewQuery();
    const data = query.data;

    return (
        <div className='mb-4'>
            <HeroBanner />

            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <KpiCard
                    label="Total Inquiries"
                    value={fmt(data?.kpis.totalInquiries)}
                    deltaPct={data?.kpis.totalDeltaPct ?? null}
                    icon={<MessageSquare className="h-5 w-5" />}
                    iconTone="emerald"
                />
                <KpiCard
                    label="New This Month"
                    value={fmt(data?.kpis.newThisMonth)}
                    deltaPct={data?.kpis.newDeltaPct ?? null}
                    icon={<UserPlus className="h-5 w-5" />}
                    iconTone="blue"
                />
                <KpiCard
                    label="In Review"
                    value={fmt(data?.kpis.inReview)}
                    icon={<Clock className="h-5 w-5" />}
                    iconTone="amber"
                    deltaSuffix="open right now"
                />
                <KpiCard
                    label="Responded This Month"
                    value={fmt(data?.kpis.responded)}
                    deltaPct={data?.kpis.respondedDeltaPct ?? null}
                    icon={<CheckCircle2 className="h-5 w-5" />}
                    iconTone="violet"
                />
            </div>

            <div className="mb-6 grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <RecentInquiries items={data?.recentInquiries} isLoading={query.isLoading} />
                </div>
                <StatusDonut items={data?.byStatus} isLoading={query.isLoading} />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <MonthlyBar items={data?.monthlyInquiries} isLoading={query.isLoading} />
                </div>
                <TopSources items={data?.topSources} isLoading={query.isLoading} />
            </div>
        </div>
    );
}

function fmt(n: number | undefined): string {
    if (n == null) return '—';
    return n.toLocaleString();
}
