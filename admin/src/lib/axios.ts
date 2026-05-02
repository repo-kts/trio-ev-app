import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8001',
    withCredentials: true,
    timeout: 15_000,
});

const CSRF_COOKIE = 'csrf_token';
const MUTATING_METHODS = new Set(['post', 'put', 'patch', 'delete']);

function readCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]!) : null;
}

let csrfPrimed = false;
async function ensureCsrfCookie() {
    if (csrfPrimed && readCookie(CSRF_COOKIE)) return;
    if (readCookie(CSRF_COOKIE)) {
        csrfPrimed = true;
        return;
    }
    await axios.get(`${api.defaults.baseURL}/api/auth/csrf`, { withCredentials: true });
    csrfPrimed = true;
}

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const method = (config.method ?? 'get').toLowerCase();
    if (MUTATING_METHODS.has(method)) {
        await ensureCsrfCookie();
        const token = readCookie(CSRF_COOKIE);
        if (token) {
            config.headers.set('x-csrf-token', token);
        }
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            const path = window.location.pathname;
            if (path !== '/login') {
                window.location.assign('/login');
            }
        }
        return Promise.reject(error);
    },
);
