import { z } from 'zod';
import { inquiryStatusSchema, inquirySchema } from './inquiry';

export const dashboardKpisSchema = z.object({
    totalInquiries: z.number(),
    totalDeltaPct: z.number().nullable(),
    newThisMonth: z.number(),
    newDeltaPct: z.number().nullable(),
    inReview: z.number(),
    responded: z.number(),
    respondedDeltaPct: z.number().nullable(),
});

export const statusBreakdownItemSchema = z.object({
    status: inquiryStatusSchema,
    count: z.number(),
});

export const monthlyInquiryItemSchema = z.object({
    month: z.string(),
    label: z.string(),
    count: z.number(),
});

export const topSourceItemSchema = z.object({
    source: z.string(),
    count: z.number(),
});

export const dashboardOverviewSchema = z.object({
    kpis: dashboardKpisSchema,
    byStatus: z.array(statusBreakdownItemSchema),
    monthlyInquiries: z.array(monthlyInquiryItemSchema),
    topSources: z.array(topSourceItemSchema),
    recentInquiries: z.array(inquirySchema),
});
export type DashboardOverview = z.infer<typeof dashboardOverviewSchema>;
