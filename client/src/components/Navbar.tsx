import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-background/50 border-b border-secondary/50"
        >
            <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Trio Logo" className="h-10 md:h-12 w-auto object-contain scale-[2] md:scale-[2.5] origin-left" />
            </Link>
            <nav className="hidden md:flex gap-8 text-sm font-medium text-textPrimary/80">
                <Link to="/rentals" className="hover:text-accent transition-colors">Rentals</Link>
                <Link to="/leasing" className="hover:text-accent transition-colors">Lease</Link>
                <Link to="/transport" className="hover:text-accent transition-colors">Transportation</Link>
                <Link to="/about" className="hover:text-accent transition-colors">About us</Link>
            </nav>
            <button className="hidden md:block px-6 py-2 bg-accent text-background font-semibold rounded-full hover:bg-accent/90 transition-colors">
                Contact Sales
            </button>
        </motion.header>
    );
}
