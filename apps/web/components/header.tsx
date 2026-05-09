import Link from "next/link";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Portfolio" },
    { href: "/about", label: "About" },
];

export function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
            <span className="text-sm font-semibold tracking-tight">Invest Platform</span>
            <nav className="sm:flex items-center gap-6 text-sm text-white/60">
                {navLinks.map(({ href, label }) => (
                    <Link key={href} href={href} className="hover:text-white transition-colors">
                        {label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
