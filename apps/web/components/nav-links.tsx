'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Portfolio' },
    { href: '/about', label: 'About' },
];

export function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="sm:flex items-center gap-6 text-sm text-white/60">
            {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        className={isActive ? 'marker-highlight text-white' : 'hover:text-white transition-colors'}
                    >
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}
