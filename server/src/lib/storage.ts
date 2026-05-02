import { mkdir, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const STORAGE_ROOT = path.resolve(process.cwd(), 'storage', 'uploads');
const PUBLIC_PREFIX = '/uploads';

export async function ensureStorage() {
    await mkdir(STORAGE_ROOT, { recursive: true });
}

export function storageRoot() {
    return STORAGE_ROOT;
}

export function publicUrl(key: string) {
    return `${PUBLIC_PREFIX}/${key.replace(/^\//, '')}`;
}

function safeExt(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    if (!/^\.[a-z0-9]{1,8}$/.test(ext)) return '';
    return ext;
}

export function newKey(originalName: string, suffix?: string): string {
    const ext = safeExt(originalName);
    const id = crypto.randomBytes(12).toString('hex');
    return `${id}${suffix ? `-${suffix}` : ''}${ext}`;
}

export async function putBuffer(key: string, buffer: Buffer): Promise<void> {
    await ensureStorage();
    const target = path.join(STORAGE_ROOT, key);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, buffer);
}

export async function deleteKey(key: string): Promise<void> {
    if (!key) return;
    try {
        await unlink(path.join(STORAGE_ROOT, key));
    } catch {
        /* ignore */
    }
}
