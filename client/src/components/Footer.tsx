import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { SocialLink, SocialPlatform } from '@trio/shared/settings';
import { getPublicSettings } from '@/lib/publicApi';

const ICON_PROPS = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
} as const;

const SOCIAL_ICONS: Record<SocialPlatform, JSX.Element> = {
    instagram: (
        <svg {...ICON_PROPS}>
            <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.51 0-4.74.07-.95.04-1.46.2-1.8.34-.45.18-.78.39-1.12.73-.34.34-.55.67-.73 1.12-.14.34-.3.85-.34 1.8-.07 1.23-.07 1.59-.07 4.74s0 3.51.07 4.74c.04.95.2 1.46.34 1.8.18.45.39.78.73 1.12.34.34.67.55 1.12.73.34.14.85.3 1.8.34 1.23.07 1.59.07 4.74.07s3.51 0 4.74-.07c.95-.04 1.46-.2 1.8-.34.45-.18.78-.39 1.12-.73.34-.34.55-.67.73-1.12.14-.34.3-.85.34-1.8.07-1.23.07-1.59.07-4.74s0-3.51-.07-4.74c-.04-.95-.2-1.46-.34-1.8a3 3 0 0 0-.73-1.12 3 3 0 0 0-1.12-.73c-.34-.14-.85-.3-1.8-.34C15.51 4 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06zm0 8.14A3.2 3.2 0 1 0 8.8 12a3.2 3.2 0 0 0 3.2 3.2zm6.3-8.36a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15z" />
        </svg>
    ),
    facebook: (
        <svg {...ICON_PROPS}>
            <path d="M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.54V9.8c0-2.5 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.9h-2.33v6.98A10 10 0 0 0 22 12z" />
        </svg>
    ),
    linkedin: (
        <svg {...ICON_PROPS}>
            <path d="M20.45 20.45h-3.55V14.9c0-1.32 0-3.02-1.84-3.02-1.85 0-2.13 1.45-2.13 2.94v5.63H9.4V9h3.4v1.56h.05a3.74 3.74 0 0 1 3.36-1.85c3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z" />
        </svg>
    ),
    twitter: (
        <svg {...ICON_PROPS}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
    youtube: (
        <svg {...ICON_PROPS}>
            <path d="M23.5 7.55a3.02 3.02 0 0 0-2.13-2.13C19.5 4.9 12 4.9 12 4.9s-7.5 0-9.37.52A3.02 3.02 0 0 0 .5 7.55C0 9.42 0 12 0 12s0 2.58.5 4.45a3.02 3.02 0 0 0 2.13 2.13C4.5 19.1 12 19.1 12 19.1s7.5 0 9.37-.52a3.02 3.02 0 0 0 2.13-2.13C24 14.58 24 12 24 12s0-2.58-.5-4.45zM9.6 15.6V8.4l6.24 3.6z" />
        </svg>
    ),
    whatsapp: (
        <svg {...ICON_PROPS}>
            <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.5 0 .18 5.32.18 11.88c0 2.09.55 4.13 1.6 5.93L0 24l6.34-1.66a11.86 11.86 0 0 0 5.72 1.46h.01c6.55 0 11.87-5.32 11.87-11.88a11.78 11.78 0 0 0-3.42-8.44zM12.06 21.8h-.01a9.85 9.85 0 0 1-5.02-1.38l-.36-.21-3.76.99 1-3.66-.23-.37a9.85 9.85 0 0 1-1.51-5.27c0-5.45 4.43-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.44 9.9-9.89 9.9zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.06c-.17-.3 0-.46.13-.6.13-.13.3-.34.45-.5.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.3-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.1 4.5.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
        </svg>
    ),
    tiktok: (
        <svg {...ICON_PROPS}>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.84a6.34 6.34 0 0 0 10.86-4.43V9.18a8.16 8.16 0 0 0 4.77 1.52V7.25a4.85 4.85 0 0 1-1.84-.56z" />
        </svg>
    ),
    pinterest: (
        <svg {...ICON_PROPS}>
            <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.94-.11-2.39.02-3.42.13-.94 1.26-5.99 1.26-5.99s-.32-.65-.32-1.6c0-1.5.87-2.62 1.95-2.62.92 0 1.36.69 1.36 1.52 0 .92-.59 2.31-.9 3.6-.25 1.07.54 1.95 1.6 1.95 1.92 0 3.4-2.03 3.4-4.96 0-2.59-1.86-4.4-4.52-4.4-3.08 0-4.89 2.31-4.89 4.7 0 .93.36 1.93.8 2.47.09.11.1.2.07.31l-.3 1.21c-.05.2-.16.24-.36.14-1.34-.62-2.18-2.58-2.18-4.15 0-3.38 2.45-6.48 7.07-6.48 3.71 0 6.6 2.65 6.6 6.18 0 3.69-2.32 6.66-5.55 6.66-1.08 0-2.1-.56-2.45-1.22l-.67 2.55c-.24.93-.9 2.1-1.34 2.81A12 12 0 1 0 12 0z" />
        </svg>
    ),
    website: (
        <svg {...ICON_PROPS}>
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.07c.83 1.2 1.48 2.53 1.91 3.93h-3.82c.43-1.4 1.08-2.73 1.91-3.93zM4.26 14a7.82 7.82 0 0 1 0-4h3.38a16.5 16.5 0 0 0-.14 2 16.5 16.5 0 0 0 .14 2zm.81 2h2.95a15.65 15.65 0 0 0 1.38 3.56A8.03 8.03 0 0 1 5.07 16zm2.95-8H5.07a8.03 8.03 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.02 8zM12 19.93c-.83-1.2-1.48-2.53-1.91-3.93h3.82c-.43 1.4-1.08 2.73-1.91 3.93zM14.34 14H9.66a14.5 14.5 0 0 1 0-4h4.68a14.5 14.5 0 0 1 0 4zm.27 5.56A15.65 15.65 0 0 0 15.99 16h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14a16.5 16.5 0 0 0 .14-2 16.5 16.5 0 0 0-.14-2h3.38a7.82 7.82 0 0 1 0 4z" />
        </svg>
    ),
    other: (
        <svg {...ICON_PROPS}>
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.07c.83 1.2 1.48 2.53 1.91 3.93h-3.82c.43-1.4 1.08-2.73 1.91-3.93zM4.26 14a7.82 7.82 0 0 1 0-4h3.38a16.5 16.5 0 0 0-.14 2 16.5 16.5 0 0 0 .14 2z" />
        </svg>
    ),
};

const FALLBACK_REGISTERED =
    '26E, Raipur Mondal Para Road, P.S. Netaji Nagar, Naktala, Kolkata – 700047, West Bengal, India';
const FALLBACK_OFFICE =
    'Shilpota More, Mahammadpur Road (Opposite Curiosity), New Town, Kolkata – 700135, West Bengal, India';
const FALLBACK_PHONE = '+91 62918 42407';
const FALLBACK_EMAIL = 'info@trio-ev.com';

export function Footer() {
    const { data } = useQuery({
        queryKey: ['public-settings'],
        queryFn: getPublicSettings,
        staleTime: 60_000,
    });

    const registeredAddress = data?.registeredAddress?.trim() || FALLBACK_REGISTERED;
    const officeAddress = data?.officeAddress?.trim() || FALLBACK_OFFICE;
    const phone = data?.phone?.trim() || FALLBACK_PHONE;
    const email = data?.email?.trim() || FALLBACK_EMAIL;
    const contactCtaUrl = data?.contactCtaUrl?.trim() || '/contact';
    const socials: SocialLink[] = (data?.socials ?? []).filter(
        (s) => s.enabled !== false && s.url?.trim().length > 0,
    );

    return (
        <footer className="bg-secondary/20 border-t border-secondary/50 pt-16 pb-8 px-6 md:px-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">

                {/* Column 1: Logo & Slogan */}
                <div className="lg:col-span-1">
                    <div className="mb-4">
                        <img src="/logo.png" alt="Trio Logo" className="h-10 w-auto object-contain scale-[2] origin-left" />
                    </div>
                    <p className="text-accent font-bold text-sm mb-4">Drive Smart. Go Green.</p>
                    <p className="text-textPrimary/50 text-xs leading-relaxed max-w-[220px]">
                        TRIO EV is Kolkata's premier electric mobility company, delivering clean, green, and smart transportation solutions for businesses and individuals.
                    </p>
                    {socials.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {socials.map((s, i) => (
                                <a
                                    key={`${s.platform}-${i}`}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label ?? s.platform}
                                    title={s.label ?? s.platform}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary/60 text-textPrimary/60 hover:text-accent hover:border-accent transition-colors"
                                >
                                    {SOCIAL_ICONS[s.platform] ?? <Globe size={14} />}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Column 2: Categories */}
                <div>
                    <h4 className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] mb-6 text-textPrimary">Categories</h4>
                    <ul className="space-y-3 text-sm text-textPrimary/60 font-medium">
                        <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                        <li><Link to="/leasing" className="hover:text-accent transition-colors">Lease</Link></li>
                        <li><Link to="/rentals" className="hover:text-accent transition-colors">Rent</Link></li>
                        <li><Link to="/transport" className="hover:text-accent transition-colors">Transportation</Link></li>
                        <li><Link to="/about" className="hover:text-accent transition-colors">About us</Link></li>
                    </ul>
                </div>

                {/* Column 3: Policies */}
                <div>
                    <h4 className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] mb-6 text-textPrimary">Policies</h4>
                    <ul className="space-y-3 text-sm text-textPrimary/60 font-medium">
                        <li><Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
                        <li><Link to="/refund-policy" className="hover:text-accent transition-colors">Refund Policy</Link></li>
                    </ul>
                </div>

                {/* Column 4: Registered Address */}
                <div>
                    <h4 className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] mb-6 text-accent">Registered Address</h4>
                    <div className="space-y-4 text-[11px] text-textPrimary/60 leading-relaxed">
                        <div className="flex gap-3">
                            <MapPin size={13} className="text-accent shrink-0 mt-0.5" />
                            <p className="whitespace-pre-line">{registeredAddress}</p>
                        </div>
                        <div className="flex gap-3">
                            <Phone size={13} className="text-accent shrink-0 mt-0.5" />
                            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-accent transition-colors">{phone}</a>
                        </div>
                        <div className="flex gap-3">
                            <Mail size={13} className="text-accent shrink-0 mt-0.5" />
                            <a href={`mailto:${email}`} className="hover:text-accent transition-colors">{email}</a>
                        </div>
                    </div>
                </div>

                {/* Column 5: Office Address */}
                <div>
                    <h4 className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] mb-6 text-accent">Office Address</h4>
                    <div className="space-y-4 text-[11px] text-textPrimary/60 leading-relaxed">
                        <div className="flex gap-3">
                            <MapPin size={13} className="text-accent shrink-0 mt-0.5" />
                            <p className="whitespace-pre-line">{officeAddress}</p>
                        </div>
                        <Link
                            to={contactCtaUrl}
                            className="block text-center w-full py-3.5 bg-accent text-background font-bold rounded-lg hover:scale-[1.02] transition-all text-[10px] uppercase tracking-widest mt-2 shadow-[0_10px_20px_rgba(92,240,158,0.1)]"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto pt-8 border-t border-secondary/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-textPrimary/30">
                <p>&copy; {new Date().getFullYear()} Trio Inc. All rights reserved.</p>
                <div className="flex gap-6 italic opacity-50">
                    <span>Clean. Green. Smart.</span>
                </div>
            </div>
        </footer>
    );
}
