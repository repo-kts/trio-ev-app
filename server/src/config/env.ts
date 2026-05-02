import { z } from 'zod';

const schema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 chars'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    CORS_ORIGIN: z
        .string()
        .default('http://localhost:5173')
        .transform((s) =>
            s
                .split(',')
                .map((o) => o.trim())
                .filter(Boolean),
        ),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
