import {
    LayoutDashboard,
    Inbox,
    Newspaper,
    Image as ImageIcon,
    Tags,
    Users,
    Settings,
    type LucideIcon,
} from 'lucide-react';

export interface NavItem {
    label: string;
    to: string;
    icon: LucideIcon;
    end?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    { label: 'Overview', to: '/overview', icon: LayoutDashboard, end: true },
    { label: 'Inquiries', to: '/inquiries', icon: Inbox },
    { label: 'Blog', to: '/blog', icon: Newspaper },
    { label: 'Media', to: '/media', icon: ImageIcon },
    { label: 'Taxonomy', to: '/taxonomy', icon: Tags },
    { label: 'Users', to: '/users', icon: Users },
    { label: 'Settings', to: '/settings', icon: Settings },
];
