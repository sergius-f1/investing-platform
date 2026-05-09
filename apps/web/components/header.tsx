import { NavLinks } from '@/components/nav-links';

export function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
            <span className="text-sm font-semibold tracking-tight">Invest Platform</span>
            <NavLinks />
        </header>
    );
}
