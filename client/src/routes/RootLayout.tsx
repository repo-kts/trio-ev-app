import { Outlet, Link } from 'react-router-dom';

export function RootLayout() {
    return (
        <div className="min-h-full flex flex-col">
            <header className="border-b border-slate-200 px-6 py-4">
                <nav className="flex gap-4 text-sm font-medium">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                </nav>
            </header>
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
