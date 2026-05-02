import { Globe, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-secondary/20 border-t border-secondary/50 pt-16 pb-8 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="mb-4">
                        <img src="/logo.png" alt="Trio Logo" className="h-12 md:h-16 w-auto object-contain scale-[2] md:scale-[2.5] origin-left" />
                    </div>
                    <p className="text-textPrimary/60 text-sm mb-6 max-w-xs">
                        Leading the transition to sustainable mobility with smart, connected, and reliable EV solutions.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-secondary rounded-full text-textPrimary hover:text-accent transition-colors"><Globe size={18} /></a>
                        <a href="#" className="p-2 bg-secondary rounded-full text-textPrimary hover:text-accent transition-colors"><MessageCircle size={18} /></a>
                        <a href="#" className="p-2 bg-secondary rounded-full text-textPrimary hover:text-accent transition-colors"><Mail size={18} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-heading font-bold text-lg mb-4 text-textPrimary">Services</h4>
                    <ul className="space-y-2 text-sm text-textPrimary/60">
                        <li><a href="#" className="hover:text-accent transition-colors">EV Leasing</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Daily Rentals</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Corporate Transport</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Fleet Management</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-heading font-bold text-lg mb-4 text-textPrimary">Company</h4>
                    <ul className="space-y-2 text-sm text-textPrimary/60">
                        <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Sustainability</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-secondary/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-textPrimary/40">
                <p>&copy; {new Date().getFullYear()} Trio Inc. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-textPrimary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-textPrimary transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
