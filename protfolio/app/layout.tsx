import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import React from "react";
import Navbar from "@/components/navbar";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [{ color: "#040810" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <title>{siteConfig.name}</title>
            <meta name="google-site-verification" content="sf7MHbEOQfTYms8MKNAOeMvCa_3rGpnuwgz8glzlhEI" />

            {/* Cyberpunk fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
                rel="stylesheet"
            />
        </head>
        <body className="min-h-screen bg-[#040810] text-slate-200 antialiased font-['Rajdhani',sans-serif] overflow-x-hidden">

        {/* ── Global grid overlay ── */}
        <div
            className="pointer-events-none fixed inset-0 z-0"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0,245,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.025) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
            }}
        />

        {/* ── Global ambient glow ── */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(ellipse,rgba(0,245,255,0.05)_0%,transparent_70%)]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(ellipse,rgba(255,0,110,0.04)_0%,transparent_70%)]" />
        </div>

        {/* ── App shell ── */}
        <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>

            {/* ── Footer ── */}
            <footer className="relative z-10 border-t border-[rgba(0,245,255,0.08)] mt-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-['Oxanium',monospace] font-bold text-cyan-400 text-sm tracking-wide">
                [RBN0x00]
              </span>
                    <span className="font-['Oxanium',monospace] text-[0.62rem] tracking-[2px] uppercase text-slate-600">
                © {new Date().getFullYear()} Riadh Benlamine · Security Researcher
              </span>
                    <div className="flex gap-5">
                        {[
                            { label: "GitHub",  href: "https://github.com/RiadhBenlamine" },
                            { label: "Blog",    href: "https://medium.com/@rbn0x00" },
                            { label: "Contact", href: "/contact" },
                        ].map((l) => (
                            <a
                                key={l.label}
                                href={l.href}
                                target={l.href.startsWith("http") ? "_blank" : undefined}
                                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="font-['Oxanium',monospace] text-[0.62rem] tracking-[1.5px] uppercase text-slate-600 hover:text-cyan-400 transition-colors duration-200"
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>

        <Analytics />
        </body>
        </html>
    );
}