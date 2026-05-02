import type { RequestHandler } from 'express';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

const SKIP_PATHS = [/^\/api\/admin\b/, /^\/health$/, /^\/api\/auth\/(csrf|me)$/];

export const trackVisit: RequestHandler = (req, _res, next) => {
    if (req.method === 'GET' && !SKIP_PATHS.some((re) => re.test(req.path))) {
        prisma.visit
            .create({
                data: {
                    path: req.path.slice(0, 200),
                    ip: (req.ip ?? '').slice(0, 64) || null,
                    ua: (req.get('user-agent') ?? '').slice(0, 200) || null,
                },
            })
            .catch((err) => logger.warn({ err }, 'visit log failed'));
    }
    next();
};
