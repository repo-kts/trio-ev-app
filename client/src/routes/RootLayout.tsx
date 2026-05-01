import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function RootLayout() {
    return (
        <div className="min-h-full flex flex-col relative bg-background">
            <Navbar />
            <main className="flex-1 w-full overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
