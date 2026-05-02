import type { RequestHandler } from 'express';
import * as mediaService from './media.service';
import { badRequest } from '@/utils/http-error';

export const uploadHandler: RequestHandler = async (req, res, next) => {
    try {
        if (!req.file) throw badRequest('No file uploaded');
        const created = await mediaService.uploadImage({
            buffer: req.file.buffer,
            mimetype: req.file.mimetype,
            originalName: req.file.originalname,
            uploadedById: req.user!.sub,
            alt: typeof req.body?.alt === 'string' ? req.body.alt : null,
        });
        res.status(201).json(mediaService.shapeMedia(created));
    } catch (err) {
        next(err);
    }
};

export const listHandler: RequestHandler = async (req, res, next) => {
    try {
        const kind = (req.query.kind as 'IMAGE' | 'VIDEO' | 'FILE' | undefined) ?? undefined;
        const items = await mediaService.list(kind);
        res.json(items.map(mediaService.shapeMedia));
    } catch (err) {
        next(err);
    }
};

export const deleteHandler: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
        res.json(await mediaService.remove(req.params.id));
    } catch (err) {
        next(err);
    }
};
