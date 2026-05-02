import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { validate } from '@/middleware/validate';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

const trackBodySchema = z.object({
    path: z.string().min(1).max(512),
    referrer: z.string().max(512).optional().nullable(),
});

const trackLimiter = rateLimit({
    windowMs: 60_000,
    limit: 120,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});

export const trackRouter: Router = Router();

trackRouter.post('/', trackLimiter, validate(trackBodySchema), (req, res) => {
    const { path } = req.body as z.infer<typeof trackBodySchema>;
    prisma.visit
        .create({
            data: {
                path: path.slice(0, 200),
                ip: (req.ip ?? '').slice(0, 64) || null,
                ua: (req.get('user-agent') ?? '').slice(0, 200) || null,
            },
        })
        .catch((err) => logger.warn({ err }, 'track visit failed'));
    res.status(204).end();
});
