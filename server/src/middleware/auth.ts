import type { RequestHandler } from 'express';
import { verifyToken, type JwtPayload } from '@/utils/jwt';
import { unauthorized } from '@/utils/http-error';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const requireAuth: RequestHandler = (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) return next(unauthorized('Missing bearer token'));

    try {
        req.user = verifyToken(header.slice(7));
        next();
    } catch {
        next(unauthorized('Invalid or expired token'));
    }
};
