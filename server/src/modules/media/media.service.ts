import sharp from 'sharp';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { deleteKey, newKey, publicUrl, putBuffer } from '@/lib/storage';
import { badRequest, notFound } from '@/utils/http-error';

const VARIANTS = [1600, 800, 400] as const;

interface UploadInput {
    buffer: Buffer;
    mimetype: string;
    originalName: string;
    uploadedById: string;
    alt?: string | null;
}

const mediaSelect = {
    id: true,
    kind: true,
    originalKey: true,
    thumbKey: true,
    variants: true,
    mime: true,
    size: true,
    width: true,
    height: true,
    duration: true,
    alt: true,
    createdAt: true,
} satisfies Prisma.MediaSelect;

export async function uploadImage(input: UploadInput) {
    if (!input.mimetype.startsWith('image/')) {
        throw badRequest('Only image uploads supported in this version');
    }
    if (input.buffer.length > 8 * 1024 * 1024) {
        throw badRequest('Image larger than 8 MB');
    }

    const meta = await sharp(input.buffer).metadata();
    const ext = '.webp';
    const baseName = input.originalName.replace(/\.[a-z0-9]+$/i, '') || 'image';

    const originalKey = newKey(`${baseName}${ext}`);
    const originalBuf = await sharp(input.buffer)
        .rotate()
        .webp({ quality: 90 })
        .toBuffer();
    await putBuffer(originalKey, originalBuf);

    const variants: { key: string; width: number | null; height: number | null }[] = [];
    for (const w of VARIANTS) {
        if (meta.width && meta.width <= w) continue;
        const key = newKey(`${baseName}${ext}`, `${w}`);
        const out = await sharp(input.buffer)
            .rotate()
            .resize({ width: w, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toBuffer();
        await putBuffer(key, out);
        const m = await sharp(out).metadata();
        variants.push({ key, width: m.width ?? null, height: m.height ?? null });
    }

    const thumbKey = newKey(`${baseName}${ext}`, 'thumb');
    const thumbBuf = await sharp(input.buffer)
        .rotate()
        .resize({ width: 240, height: 240, fit: 'cover' })
        .webp({ quality: 80 })
        .toBuffer();
    await putBuffer(thumbKey, thumbBuf);

    return prisma.media.create({
        data: {
            kind: 'IMAGE',
            originalKey,
            thumbKey,
            variants,
            mime: 'image/webp',
            size: originalBuf.length,
            width: meta.width ?? null,
            height: meta.height ?? null,
            alt: input.alt ?? null,
            uploadedById: input.uploadedById,
        },
        select: mediaSelect,
    });
}

export async function list(kind?: 'IMAGE' | 'VIDEO' | 'FILE', limit = 60) {
    return prisma.media.findMany({
        where: kind ? { kind } : undefined,
        select: mediaSelect,
        orderBy: { createdAt: 'desc' },
        take: limit,
    });
}

export async function remove(id: string) {
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) throw notFound('Media not found');
    await prisma.media.delete({ where: { id } });
    await deleteKey(media.originalKey);
    if (media.thumbKey) await deleteKey(media.thumbKey);
    for (const v of (media.variants as { key: string }[]) ?? []) {
        await deleteKey(v.key);
    }
    return { ok: true };
}

export function shapeMedia(m: Awaited<ReturnType<typeof list>>[number]) {
    const variants = (m.variants as { key: string; width: number | null; height: number | null }[]) ?? [];
    return {
        id: m.id,
        kind: m.kind,
        url: publicUrl(m.originalKey),
        thumbUrl: m.thumbKey ? publicUrl(m.thumbKey) : null,
        variants: variants.map((v) => ({
            key: publicUrl(v.key),
            width: v.width,
            height: v.height,
        })),
        mime: m.mime,
        size: m.size,
        width: m.width,
        height: m.height,
        alt: m.alt,
        createdAt: m.createdAt,
    };
}
