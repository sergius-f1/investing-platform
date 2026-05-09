import type { ReactNode } from "react";

export default function About() {
    return (
        <div className="flex flex-col flex-1 bg-black text-white">
            <main className="flex flex-col gap-16 max-w-3xl mx-auto w-full px-8 py-16">

                <section className="flex flex-col gap-4">
                    <h1 className="text-4xl font-semibold tracking-tight">About</h1>
                    <p className="text-white/60 text-lg leading-relaxed">
                        Investment Platform is a personal portfolio dashboard for tracking positions,
                        monitoring risk, and acting on market signals — with live price updates and
                        cursor-based pagination across 40 positions.
                    </p>
                </section>

                <section className="flex flex-col gap-6">
                    <h2 className="text-xl font-semibold">Tech Stack</h2>

                    <div className="flex flex-col gap-4">
                        <TechGroup label="Frontend">
                            <Tech name="Next.js 16" description="App Router, Server Components, async searchParams" />
                            <Tech name="React 19" description="UI layer" />
                            <Tech name="Tailwind CSS 4" description="Utility-first styling" />
                            <Tech name="shadcn/ui" description="Table, Pagination — built on Base UI primitives" />
                            <Tech name="TypeScript" description="End-to-end type safety" />
                        </TechGroup>

                        <TechGroup label="Real-time">
                            <Tech name="Server-Sent Events" description="Live price updates every 3s, proxied through Next.js route handler" />
                            <Tech name="Cursor pagination" description="SSE streams only the visible page — not the full dataset" />
                        </TechGroup>

                        <TechGroup label="Backend">
                            <Tech name="Express 5" description="HTTP server, routing, middleware" />
                            <Tech name="Helmet" description="Secure HTTP headers" />
                            <Tech name="express-rate-limit" description="60 req/min per IP" />
                            <Tech name="Bearer token auth" description="All /api routes require a token" />
                        </TechGroup>

                        <TechGroup label="Shared">
                            <Tech name="@fedasenka/models" description="Zod schemas shared between web and API via npm workspaces" />
                        </TechGroup>

                        <TechGroup label="Infrastructure">
                            <Tech name="AWS App Runner" description="Two services: API and Web, auto-deploy on push to main" />
                            <Tech name="GitHub Actions" description="CI on every PR — type-check and build both apps" />
                        </TechGroup>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Why a separate API server?</h2>
                    <div className="flex flex-col gap-3 text-white/60 leading-relaxed">
                        <p>
                            Next.js Route Handlers would have worked, but they tie business logic to the
                            deployment lifecycle of the frontend. A separate Express server gives a cleaner
                            boundary — the API can be deployed, scaled, and versioned independently.
                        </p>
                        <p>
                            It also makes auth and rate-limiting explicit. With Route Handlers, security
                            middleware has to be wired per-route or via a custom wrapper. With Express, a
                            single middleware covers all <code className="text-white/80 bg-white/10 px-1.5 py-0.5 rounded text-sm">/api</code> routes in one place.
                        </p>
                        <p>
                            Finally, keeping the API separate means it can be consumed by other clients in the
                            future — mobile, CLI, or other services — without any changes.
                        </p>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Architecture</h2>
                    <div className="flex flex-col gap-3 text-white/60 leading-relaxed">
                        <p>
                            The project is an npm workspaces monorepo with three packages:
                        </p>
                        <ul className="flex flex-col gap-2 pl-4 border-l border-white/10">
                            <li><span className="text-white">apps/web</span> — Next.js frontend. Server Components fetch data and render HTML. The browser receives only the page — never the API token.</li>
                            <li><span className="text-white">apps/api</span> — Express API. Owns all data access and business logic. Protected by bearer token auth.</li>
                            <li><span className="text-white">packages/models</span> — Zod schemas for shared types. Both apps import from here, so the contract is validated at runtime on both sides.</li>
                        </ul>
                        <p>
                            The web app's <code className="text-white/80 bg-white/10 px-1.5 py-0.5 rounded text-sm">lib/api/</code> is split
                            into <code className="text-white/80 bg-white/10 px-1.5 py-0.5 rounded text-sm">server/</code> and <code className="text-white/80 bg-white/10 px-1.5 py-0.5 rounded text-sm">client/</code> layers.
                            The server layer holds the Bearer-token HTTP client — it only ever runs in Node.js.
                            The client layer exposes a typed <code className="text-white/80 bg-white/10 px-1.5 py-0.5 rounded text-sm">EventSource</code> factory
                            for the browser, which connects to a Next.js route handler that proxies the SSE stream from Express.
                        </p>
                    </div>
                </section>

            </main>
        </div>
    );
}

function TechGroup({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest text-white/30">{label}</p>
            <div className="flex flex-col divide-y divide-white/5 rounded-lg border border-white/10 overflow-hidden">
                {children}
            </div>
        </div>
    );
}

function Tech({ name, description }: { name: string; description: string }) {
    return (
        <div className="flex items-baseline justify-between gap-4 px-4 py-3">
            <span className="text-sm font-medium shrink-0">{name}</span>
            <span className="text-sm text-white/40 text-right">{description}</span>
        </div>
    );
}
