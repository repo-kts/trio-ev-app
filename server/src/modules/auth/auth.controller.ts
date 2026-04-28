import type { RequestHandler } from 'express';
import * as authService from './auth.service';
import type { LoginInput, RegisterInput } from './auth.schema';

export const registerHandler: RequestHandler<unknown, unknown, RegisterInput> = async (
    req,
    res,
    next,
) => {
    try {
        res.status(201).json(await authService.register(req.body));
    } catch (err) {
        next(err);
    }
};

export const loginHandler: RequestHandler<unknown, unknown, LoginInput> = async (
    req,
    res,
    next,
) => {
    try {
        res.json(await authService.login(req.body));
    } catch (err) {
        next(err);
    }
};

export const meHandler: RequestHandler = async (req, res, next) => {
    try {
        res.json(await authService.me(req.user!.sub));
    } catch (err) {
        next(err);
    }
};
