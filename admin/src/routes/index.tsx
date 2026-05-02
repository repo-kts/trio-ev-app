/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AdminShell } from '@/components/layout/AdminShell';
import { AuthGuard } from '@/features/auth/AuthGuard';

const Login = lazy(() => import('@/features/auth/pages/Login'));
const Overview = lazy(() => import('@/features/dashboard/pages/Overview'));
const InquiryList = lazy(() => import('@/features/inquiry/pages/InquiryList'));
const PostList = lazy(() => import('@/features/blog/pages/PostList'));
const PostEditor = lazy(() => import('@/features/blog/pages/PostEditor'));
const MediaLibrary = lazy(() => import('@/features/blog/pages/MediaLibrary'));
const Taxonomy = lazy(() => import('@/features/blog/pages/Taxonomy'));
const Placeholder = lazy(() => import('./Placeholder'));

function PageFallback() {
    return (
        <div className="flex h-full items-center justify-center text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" />
        </div>
    );
}

function withSuspense(node: ReactNode) {
    return <Suspense fallback={<PageFallback />}>{node}</Suspense>;
}

export const router = createBrowserRouter([
    {
        path: '/login',
        element: withSuspense(<Login />),
    },
    {
        path: '/',
        element: (
            <AuthGuard>
                <AdminShell />
            </AuthGuard>
        ),
        children: [
            { index: true, element: <Navigate to="/overview" replace /> },
            { path: 'overview', element: withSuspense(<Overview />) },
            { path: 'inquiries', element: withSuspense(<InquiryList />) },
            { path: 'inquiries/:id', element: withSuspense(<InquiryList />) },
            { path: 'blog', element: withSuspense(<PostList />) },
            { path: 'blog/new', element: withSuspense(<PostEditor />) },
            { path: 'blog/:id', element: withSuspense(<PostEditor />) },
            { path: 'media', element: withSuspense(<MediaLibrary />) },
            { path: 'taxonomy', element: withSuspense(<Taxonomy />) },
            {
                path: 'users',
                element: withSuspense(<Placeholder title="Users" />),
            },
            {
                path: 'settings',
                element: withSuspense(<Placeholder title="Settings" />),
            },
            { path: '*', element: <Navigate to="/overview" replace /> },
        ],
    },
]);
