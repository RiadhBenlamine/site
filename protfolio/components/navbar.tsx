"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Briefcase, Code, FolderGit2, Mail, Book, Menu, X , Info} from "lucide-react";
import { FaMicroscope } from "react-icons/fa";

// ─── LOGO ────────────────────────────────────────────────────────────────────
export const RbnLogo = () => (
    <Link href="/" className="group flex items-center gap-1 font-['Oxanium',monospace] text-lg md:text-xl font-bold no-underline">
        <span className="text-cyan-400 group-hover:text-white transition-colors duration-200">[</span>
        <span className="text-white group-hover:text-cyan-400 transition-colors duration-200">rbn0x00</span>
        <span className="text-cyan-400 font-bold">@</span>
        <span className="text-white group-hover:text-cyan-400 transition-colors duration-200">portfolio</span>
        <span className="text-cyan-400 group-hover:text-white transition-colors duration-200">]</span>
        <span className="text-slate-600 ml-1">
      $<span className="animate-pulse ml-0.5 text-cyan-400/60">_</span>
    </span>
    </Link>
);

const navLinks = [
    { name: "About", href: "/about", icon: Info },
    { name: "Experience", href: "/experience", icon: Briefcase },
    { name: "Skills",     href: "/skills",     icon: Code },
    { name: "Projects",   href: "/projects",   icon: FolderGit2 },
    { name: "Blog",       href: "/blog",       icon: Book },
    { name: "Research",   href: "/research",   icon: FaMicroscope },
    { name: "Contact",    href: "/contact",    icon: Mail },
];

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen]   = useState(false);
    const [scrolled, setScrolled]       = useState(false);
    const pathname                      = usePathname();

    // shrink on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // close mobile menu on route change
    useEffect(() => { setIsMenuOpen(false); }, [pathname]);

    // lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    return (
        <>
            <style>{`
        @keyframes menu-slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-enter { animation: menu-slide-down 0.25s ease forwards; }
      `}</style>

            <nav
                className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300
          ${scrolled
                    ? "bg-[rgba(4,8,16,0.97)] backdrop-blur-xl border-b border-[rgba(0,245,255,0.15)] py-0"
                    : "bg-[rgba(4,8,16,0.8)] backdrop-blur-md border-b border-[rgba(0,245,255,0.08)] py-0"
                }`}
            >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

                    {/* ── LOGO ── */}
                    <RbnLogo />

                    {/* ── DESKTOP LINKS ── */}
                    <ul className="hidden sm:flex items-center gap-0 list-none m-0 p-0">
                        {navLinks.map((link) => {
                            const Icon  = link.icon;
                            const active = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`relative flex items-center gap-1.5 px-4 py-5 font-['Oxanium',monospace] text-[0.72rem] font-semibold tracking-[1.5px] uppercase no-underline transition-all duration-200 group
                      ${active ? "text-cyan-400" : "text-slate-500 hover:text-white"}`}
                                    >
                                        <Icon className={`w-3.5 h-3.5 transition-colors duration-200 ${active ? "text-cyan-400" : "group-hover:text-cyan-400"}`} />
                                        {link.name}
                                        {/* Active underline */}
                                        <span
                                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-cyan-400 shadow-[0_0_6px_rgba(0,245,255,0.8)] transition-all duration-300
                        ${active ? "w-4/5" : "w-0 group-hover:w-3/5"}`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* ── DESKTOP CTA ── */}
                    <div className="hidden sm:flex items-center gap-3">
                        {/* Status dot */}
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(57,255,20,0.8)] animate-pulse" />
                            <span className="font-['Oxanium',monospace] text-[0.6rem] tracking-[1.5px] uppercase text-green-400">
                Available
              </span>
                        </div>

                        <Link
                            href="/contact"
                            className={`flex items-center gap-2 font-['Oxanium',monospace] text-[0.68rem] font-bold tracking-[2px] uppercase no-underline px-5 py-2
                text-[#040810] bg-cyan-400 hover:bg-white hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]
                transition-all duration-200`}
                            style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
                        >
                            <Mail className="w-3.5 h-3.5" />
                            Hire Me
                        </Link>
                    </div>

                    {/* ── MOBILE TOGGLE ── */}
                    <button
                        onClick={() => setIsMenuOpen((v) => !v)}
                        className="sm:hidden flex items-center justify-center w-9 h-9 border border-[rgba(0,245,255,0.2)] bg-[#070d1a]/80 text-cyan-400 transition-all duration-200 hover:border-cyan-400/50 hover:shadow-[0_0_12px_rgba(0,245,255,0.15)]"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </button>
                </div>
            </nav>

            {/* ── MOBILE OVERLAY ── */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-[#040810]/90 backdrop-blur-md z-[999] sm:hidden mobile-menu-enter"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* ── MOBILE DRAWER ── */}
            <div
                className={`fixed top-16 left-0 right-0 z-[999] sm:hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}
            >
                <div className="bg-[rgba(4,8,16,0.98)] border-b border-[rgba(0,245,255,0.15)] backdrop-blur-xl">
                    {/* Top accent */}
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                    <ul className="list-none m-0 p-0 py-3">
                        {navLinks.map((link, i) => {
                            const Icon  = link.icon;
                            const active = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-4 px-6 py-4 font-['Oxanium',monospace] text-[0.8rem] font-semibold tracking-[2px] uppercase no-underline transition-all duration-200
                      ${active
                                            ? "text-cyan-400 bg-cyan-400/10 border-l-2 border-cyan-400"
                                            : "text-slate-400 border-l-2 border-transparent hover:text-white hover:bg-white/5 hover:border-l-2 hover:border-cyan-400/40"
                                        }`}
                                        style={{ animationDelay: `${i * 40}ms` }}
                                    >
                                        <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-cyan-400" : "text-slate-600"}`} />
                                        <span>{link.name}</span>
                                        {active && (
                                            <span className="ml-auto font-['Oxanium',monospace] text-[0.55rem] tracking-[2px] text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5">
                        ACTIVE
                      </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Mobile CTA */}
                    <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
                        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,245,255,0.15)] to-transparent" />
                        <div className="flex items-center gap-2 py-1">
                            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(57,255,20,0.8)] animate-pulse" />
                            <span className="font-['Oxanium',monospace] text-[0.62rem] tracking-[2px] uppercase text-green-400">
                Available for freelance
              </span>
                        </div>
                        <Link
                            href="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-center gap-2 font-['Oxanium',monospace] text-[0.75rem] font-bold tracking-[3px] uppercase no-underline py-3
                text-[#040810] bg-cyan-400 hover:bg-white hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]
                transition-all duration-200"
                            style={{ clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}
                        >
                            <Mail className="w-4 h-4" />
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}