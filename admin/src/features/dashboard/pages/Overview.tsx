import {
    Calendar,
    CheckCircle2,
    Clock,
    Eye,
    MessageSquare,
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

            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <KpiCard
                    label="Total Inquiries"
                    value={fmt(data?.kpis.totalInquiries)}
                    deltaPct={data?.kpis.totalDeltaPct ?? null}
                    icon={<MessageSquare className="h-5 w-5" />}
                    iconTone="emerald"
                />
                <KpiCard
                    label="Daily Visits"
                    value={fmt(data?.kpis.dailyVisits)}
                    deltaPct={data?.kpis.dailyVisitsDeltaPct ?? null}
                    icon={<Eye className="h-5 w-5" />}
                    iconTone="blue"
                    deltaSuffix="vs yesterday"
                />
                <KpiCard
                    label="Monthly Visits"
                    value={fmt(data?.kpis.monthlyVisits)}
                    deltaPct={data?.kpis.monthlyVisitsDeltaPct ?? null}
                    icon={<Calendar className="h-5 w-5" />}
                    iconTone="violet"
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
                    iconTone="emerald"
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
