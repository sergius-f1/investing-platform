import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { NetworkBackground } from "@/components/network-background";

import styles from "./page.module.css";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 overflow-hidden bg-black text-white">

            <main className={`${styles.heroGradient} flex flex-1 flex-col items-center justify-center text-center px-8 py-32 relative overflow-hidden`}>
                <NetworkBackground />

                <div className="relative flex flex-col items-center">
                    <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight max-w-2xl leading-tight">
                        Smarter Portfolios,<br />Powered by Data
                    </h1>
                    <p className="mt-6 text-base sm:text-lg text-white/50 max-w-sm">
                        Track positions, monitor risk, and act on signals — all in one place.
                    </p>
                    <Link href="/dashboard" className={buttonVariants({ size: "lg", className: "mt-10 px-8" })}>
                        View Portfolio
                    </Link>
                </div>
            </main>
        </div>
    );
}