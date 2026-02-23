// app/research/page.tsx
"use client";

import { Bug, FileCode, ExternalLink, Award, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

interface CVE {
    id: string;
    title: string;
    description: string;
    severity: "Critical" | "High" | "Medium" | "Low";
    cvss: number;
    date: string;
    vendor: string;
    status: "Published" | "Under Review" | "Patched";
    cveLink?: string;
    details: string[];
}

interface Exploit {
    id: string;
    title: string;
    edbId: string;
    platform: string;
    type: string;
    date: string;
    author: string;
    verified: boolean;
    edbLink: string;
    description: string;
}

interface BugBounty {
    id: string;
    program: string;
    vulnerability: string;
    severity: "Critical" | "High" | "Medium" | "Low";
    bounty: string;
    date: string;
    status: "Resolved" | "Triaged" | "Pending";
    description: string;
}

const cves: CVE[] = [
    {
        id: "CVE-2025-26186",
        title: "SQL injection vulnerability in OpenSIS",
        description: "Unauthenticated remote code execution vulnerability in Opensis software",
        severity: "Critical",
        cvss: 8.1,
        date: "2025-07-15",
        vendor: "OS4ED",
        status: "Patched",
        cveLink: "https://nvd.nist.gov/vuln/detail/CVE-2025-26186",
        details: [
            "Allows unauthenticated attackers to execute arbitrary code exploiting SQL injection",
            "Affects all versions",
            "CVE assigned with CVSS score of 8.1",
        ],
    },
];

const exploits: Exploit[] = [
    {
        id: "1",
        title: "Student Result Management System 1.0 - SQL Injection",
        edbId: "EDB-49974",
        platform: "Web Applications",
        type: "SQL Injection",
        date: "2021-06-10",
        verified: true,
        description: "POC for SQL injection on SRMS 1.0",
        author: "Riadh Benlamine",
        edbLink: "https://www.exploit-db.com/exploits/49974",
    },
    {
        id: "2",
        title: "Stock Management System 1.0 - Blind SQL Injection (Authenticated)",
        edbId: "EDB-49994",
        platform: "Web Application",
        type: "Blind SQL Injection",
        date: "2021-06-14",
        verified: true,
        description: "PoC demonstrating blind SQL injection through sanitized input in web application",
        author: "Riadh Benlamine",
        edbLink: "https://www.exploit-db.com/exploits/49994",
    },
    {
        id: "3",
        title: "Simple CRM 3.0 - Cross-Site Request Forgery (CSRF)",
        edbId: "EDB-50043",
        platform: "Web Application",
        type: "CSRF",
        date: "2021-06-21",
        verified: true,
        description: "CSRF exploit for vulnerable web application",
        author: "Riadh Benlamine",
        edbLink: "https://www.exploit-db.com/exploits/50043",
    },
    {
        id: "4",
        title: "Simple CRM 3.0 - Stored Cross-Site Scripting (XSS)",
        edbId: "EDB-50044",
        platform: "Web Application",
        type: "XSS",
        date: "2021-06-21",
        verified: true,
        description: "Critical XSS vulnerability on web application",
        author: "Riadh Benlamine",
        edbLink: "https://www.exploit-db.com/exploits/50044",
    },
];

const bugBounties: BugBounty[] = [
    {
        id: "1",
        program: "Deutsch Telekom",
        vulnerability: "CSRF",
        severity: "Medium",
        bounty: "$0",
        date: "2020-09-10",
        status: "Resolved",
        description: "CSRF vulnerability discovered and responsibly disclosed",
    },
    {
        id: "2",
        program: "Deutsch Telekom",
        vulnerability: "Several Clickjacking vulnerabilities",
        severity: "Medium",
        bounty: "$100",
        date: "2021-05-25",
        status: "Resolved",
        description: "Multiple clickjacking vulnerabilities found across several subdomains",
    },
    {
        id: "3",
        program: "Deutsch Telekom",
        vulnerability: "HTML/CSS Injections",
        severity: "Low",
        bounty: "$0",
        date: "2021-09-15",
        status: "Resolved",
        description: "Vulnerable domain to HTML injection via unsanitized input fields",
    },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────

const severityMap = {
    Critical: { label: "CRITICAL", style: "text-red-400 border-red-400/30 bg-red-400/10", dot: "bg-red-400", cvssColor: "text-red-400 shadow-[0_0_15px_rgba(255,50,50,0.4)]" },
    High:     { label: "HIGH",     style: "text-orange-400 border-orange-400/30 bg-orange-400/10", dot: "bg-orange-400", cvssColor: "text-orange-400" },
    Medium:   { label: "MEDIUM",   style: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10", dot: "bg-cyan-400", cvssColor: "text-cyan-400" },
    Low:      { label: "LOW",      style: "text-green-400 border-green-400/30 bg-green-400/10", dot: "bg-green-400", cvssColor: "text-green-400" },
};

const statusMap = {
    Patched:      { label: "PATCHED",       style: "text-green-400", dot: "bg-green-400 shadow-[0_0_6px_rgba(57,255,20,0.6)]" },
    Published:    { label: "PUBLISHED",     style: "text-amber-400",  dot: "bg-amber-400 shadow-[0_0_6px_rgba(255,214,10,0.6)]" },
    "Under Review":{ label: "UNDER REVIEW", style: "text-cyan-400",   dot: "bg-cyan-400 shadow-[0_0_6px_rgba(0,245,255,0.6)]" },
    Resolved:     { label: "RESOLVED",      style: "text-green-400", dot: "bg-green-400 shadow-[0_0_6px_rgba(57,255,20,0.6)]" },
    Triaged:      { label: "TRIAGED",       style: "text-amber-400",  dot: "bg-amber-400 shadow-[0_0_6px_rgba(255,214,10,0.6)]" },
    Pending:      { label: "PENDING",       style: "text-cyan-400",   dot: "bg-cyan-400 shadow-[0_0_6px_rgba(0,245,255,0.6)]" },
};

// ─── CARD SHELL ─────────────────────────────────────────────────────────────

function CyberCard({
                       children,
                       index,
                       accentColor = "cyan",
                   }: {
    children: React.ReactNode;
    index: number;
    accentColor?: "cyan" | "red" | "green" | "amber";
}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const accent = {
        cyan:  { border: "border-l-cyan-400/40",  bracket: "border-cyan-400",  hover: "hover:border-[rgba(0,245,255,0.35)] hover:shadow-[0_0_30px_rgba(0,245,255,0.08)]" },
        red:   { border: "border-l-red-400/40",   bracket: "border-red-400",   hover: "hover:border-red-400/30 hover:shadow-[0_0_30px_rgba(255,50,50,0.08)]" },
        green: { border: "border-l-green-400/40", bracket: "border-green-400", hover: "hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.08)]" },
        amber: { border: "border-l-amber-400/40", bracket: "border-amber-400", hover: "hover:border-amber-400/30 hover:shadow-[0_0_30px_rgba(255,214,10,0.08)]" },
    }[accentColor];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className={`relative flex flex-col h-full bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)] border-l-2 ${accent.border}
        backdrop-blur-md ${accent.hover} hover:-translate-y-1 transition-all duration-300 group`}>
                <span className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${accent.bracket} pointer-events-none`} />
                <span className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${accent.bracket} pointer-events-none`} />
                {children}
            </div>
        </div>
    );
}

// ─── CVE CARD ───────────────────────────────────────────────────────────────

function CVECard({ cve, index }: { cve: CVE; index: number }) {
    const sev = severityMap[cve.severity];
    const sta = statusMap[cve.status];

    return (
        <CyberCard index={index} accentColor="red">
            <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-red-400/10 border border-red-400/25 flex-shrink-0"
                             style={{ clipPath: "polygon(5px 0%,calc(100% - 5px) 0%,100% 50%,calc(100% - 5px) 100%,5px 100%,0% 50%)" }}>
                            <AlertTriangle className="w-4.5 h-4.5 text-red-400" />
                        </div>
                        <div>
                            <h3 className="font-['Oxanium',monospace] font-bold text-white text-sm group-hover:text-red-400 transition-colors">{cve.id}</h3>
                            <p className="font-['Oxanium',monospace] text-[0.6rem] tracking-[1px] text-slate-500 uppercase">{cve.vendor}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                        <span className={`font-['Oxanium',monospace] text-[0.58rem] font-bold tracking-[2px] uppercase px-2 py-0.5 border ${sev.style}`}>{sev.label}</span>
                        <span className={`flex items-center gap-1.5 font-['Oxanium',monospace] text-[0.58rem] tracking-[1px] ${sta.style}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${sta.dot}`} />{sta.label}
            </span>
                    </div>
                </div>

                {/* CVSS */}
                <div className="flex items-center gap-2">
                    <span className="font-['Oxanium',monospace] text-[0.62rem] tracking-wide text-slate-500 uppercase">CVSS Score</span>
                    <span className={`font-['Oxanium',monospace] text-2xl font-extrabold ${sev.cvssColor}`}>{cve.cvss}</span>
                </div>

                {/* Title */}
                <h4 className="font-['Oxanium',monospace] font-bold text-white text-sm leading-snug">{cve.title}</h4>

                {/* Desc */}
                <p className="text-xs text-slate-400 leading-relaxed font-light">{cve.description}</p>

                {/* Details */}
                <ul className="flex flex-col gap-1.5">
                    {cve.details.map((d, i) => (
                        <li key={i} className="flex gap-2 text-xs text-slate-500 leading-relaxed">
                            <span className="text-red-400 flex-shrink-0 mt-0.5">▸</span>
                            <span>{d}</span>
                        </li>
                    ))}
                </ul>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-[0.62rem] text-slate-600 font-['Oxanium',monospace] mt-auto">
                    <Calendar className="w-3 h-3" />
                    {new Date(cve.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </div>
            </div>

            {cve.cveLink && (
                <div className="px-6 pb-5 border-t border-[rgba(0,245,255,0.07)] pt-4">
                    <a href={cve.cveLink} target="_blank" rel="noopener noreferrer"
                       className="w-full flex items-center justify-center gap-2 font-['Oxanium',monospace] text-[0.68rem] font-bold tracking-[2px] uppercase
              text-red-400 border border-red-400/30 bg-red-400/10 px-4 py-2.5
              hover:bg-red-400 hover:text-[#040810] hover:shadow-[0_0_20px_rgba(255,50,50,0.4)] transition-all duration-200">
                        <ExternalLink className="w-3.5 h-3.5" /> View CVE Details
                    </a>
                </div>
            )}
        </CyberCard>
    );
}

// ─── EXPLOIT CARD ───────────────────────────────────────────────────────────

function ExploitCard({ exploit, index }: { exploit: Exploit; index: number }) {
    return (
        <CyberCard index={index} accentColor="green">
            <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-green-400/10 border border-green-400/25 flex-shrink-0"
                             style={{ clipPath: "polygon(5px 0%,calc(100% - 5px) 0%,100% 50%,calc(100% - 5px) 100%,5px 100%,0% 50%)" }}>
                            <FileCode className="w-4.5 h-4.5 text-green-400" />
                        </div>
                        <div>
                            <h3 className="font-['Oxanium',monospace] font-bold text-green-400 text-sm">{exploit.edbId}</h3>
                            <p className="font-['Oxanium',monospace] text-[0.6rem] tracking-[1px] text-slate-500 uppercase">{exploit.platform}</p>
                        </div>
                    </div>
                    {exploit.verified && (
                        <span className="flex items-center gap-1 font-['Oxanium',monospace] text-[0.58rem] font-bold tracking-[1px] uppercase text-green-400 border border-green-400/30 bg-green-400/10 px-2 py-0.5">
              <CheckCircle className="w-3 h-3" /> Verified
            </span>
                    )}
                </div>

                {/* Title */}
                <h4 className="font-['Oxanium',monospace] font-bold text-white text-sm leading-snug group-hover:text-green-400 transition-colors">
                    {exploit.title}
                </h4>

                {/* Desc */}
                <p className="text-xs text-slate-400 leading-relaxed font-light flex-1">{exploit.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {[exploit.type, exploit.platform].map((t, i) => (
                        <span key={i} className="font-['Oxanium',monospace] text-[0.58rem] tracking-wide text-green-400 border border-green-400/25 bg-green-400/10 px-2 py-0.5">
              {t}
            </span>
                    ))}
                </div>

                {/* Author + Date */}
                <div className="flex items-center justify-between font-['Oxanium',monospace] text-[0.62rem] text-slate-500">
                    <span className="text-slate-400">By {exploit.author}</span>
                    <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
                        {new Date(exploit.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </span>
                </div>
            </div>

            <div className="px-6 pb-5 border-t border-[rgba(0,245,255,0.07)] pt-4">
                <a href={exploit.edbLink} target="_blank" rel="noopener noreferrer"
                   className="w-full flex items-center justify-center gap-2 font-['Oxanium',monospace] text-[0.68rem] font-bold tracking-[2px] uppercase
            text-green-400 border border-green-400/30 bg-green-400/10 px-4 py-2.5
            hover:bg-green-400 hover:text-[#040810] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all duration-200">
                    <ExternalLink className="w-3.5 h-3.5" /> View on Exploit-DB
                </a>
            </div>
        </CyberCard>
    );
}

// ─── BUG BOUNTY CARD ────────────────────────────────────────────────────────

function BugBountyCard({ bounty, index }: { bounty: BugBounty; index: number }) {
    const sev = severityMap[bounty.severity];
    const sta = statusMap[bounty.status];
    const isPaid = bounty.bounty !== "$0";

    return (
        <CyberCard index={index} accentColor="amber">
            <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-amber-400/10 border border-amber-400/25 flex-shrink-0"
                             style={{ clipPath: "polygon(5px 0%,calc(100% - 5px) 0%,100% 50%,calc(100% - 5px) 100%,5px 100%,0% 50%)" }}>
                            <Award className="w-4.5 h-4.5 text-amber-400" />
                        </div>
                        <h3 className="font-['Oxanium',monospace] font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                            {bounty.program}
                        </h3>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                        <span className={`font-['Oxanium',monospace] text-[0.58rem] font-bold tracking-[2px] uppercase px-2 py-0.5 border ${sev.style}`}>{sev.label}</span>
                        <span className={`flex items-center gap-1.5 font-['Oxanium',monospace] text-[0.58rem] tracking-[1px] ${sta.style}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${sta.dot}`} />{sta.label}
            </span>
                    </div>
                </div>

                {/* Bounty */}
                <div className="flex items-center gap-2">
                    <span className="font-['Oxanium',monospace] text-[0.62rem] tracking-wide text-slate-500 uppercase">Bounty</span>
                    <span className={`font-['Oxanium',monospace] text-2xl font-extrabold ${isPaid ? "text-green-400 shadow-[0_0_15px_rgba(57,255,20,0.4)]" : "text-slate-600"}`}>
            {bounty.bounty}
          </span>
                </div>

                {/* Vuln type */}
                <h4 className="font-['Oxanium',monospace] font-bold text-white text-sm leading-snug">{bounty.vulnerability}</h4>

                {/* Desc */}
                <p className="text-xs text-slate-400 leading-relaxed font-light flex-1">{bounty.description}</p>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-[0.62rem] text-slate-600 font-['Oxanium',monospace] mt-auto">
                    <Calendar className="w-3 h-3" />
                    {new Date(bounty.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </div>
            </div>
        </CyberCard>
    );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

type Tab = "cves" | "exploits" | "bounties";

const tabs: { key: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { key: "cves",     label: "CVEs",        icon: Bug,      count: cves.length },
    { key: "exploits", label: "Exploits",    icon: FileCode, count: exploits.length },
    { key: "bounties", label: "Bug Bounties", icon: Award,   count: bugBounties.length },
];

const totalEarnings = bugBounties.reduce(
    (sum, b) => sum + parseInt(b.bounty.replace(/[$,]/g, "")), 0
);

const statsData = [
    { value: cves.length,         label: "CVEs Published",    color: "text-red-400",   glow: "shadow-[0_0_20px_rgba(255,50,50,0.35)]",   accent: "before:bg-red-400" },
    { value: exploits.length,     label: "Exploits Published", color: "text-green-400", glow: "shadow-[0_0_20px_rgba(57,255,20,0.35)]",   accent: "before:bg-green-400" },
    { value: bugBounties.length,  label: "Bug Bounties",       color: "text-amber-400", glow: "shadow-[0_0_20px_rgba(255,214,10,0.35)]",  accent: "before:bg-amber-400" },
    { value: `$${totalEarnings}`, label: "Total Earnings",     color: "text-cyan-400",  glow: "shadow-[0_0_20px_rgba(0,245,255,0.35)]",   accent: "before:bg-cyan-400" },
];

export default function Research() {
    const [selected, setSelected] = useState<Tab>("cves");
    const [animateContent, setAnimateContent] = useState(true);
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
            { threshold: 0.1 }
        );
        if (headerRef.current) observer.observe(headerRef.current);
        return () => { if (headerRef.current) observer.unobserve(headerRef.current); };
    }, []);

    const handleTabChange = (key: Tab) => {
        setAnimateContent(false);
        setTimeout(() => {
            setSelected(key);
            setAnimateContent(true);
        }, 150);
    };

    return (
        <section className="relative min-h-screen bg-[#040810] overflow-hidden">
            {/* Grid */}
            <div className="pointer-events-none fixed inset-0"
                 style={{ backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
            />
            {/* Ambient */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(255,50,50,0.04)_0%,transparent_70%)]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(0,245,255,0.05)_0%,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-6 py-8 relative z-10">

                {/* ── Header ── */}
                <div
                    ref={headerRef}
                    className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
                >
                    <div
                        className="inline-flex items-center gap-2 font-['Oxanium',monospace] text-[0.65rem] font-semibold tracking-[3px] uppercase text-cyan-400 border border-cyan-400/30 px-5 py-2 bg-cyan-400/10 mb-6"
                        style={{ clipPath: "polygon(8px 0%,calc(100% - 8px) 0%,100% 50%,calc(100% - 8px) 100%,8px 100%,0% 50%)" }}
                    >
                        ◈ SECURITY RESEARCH
                    </div>
                    <h2 className="font-['Oxanium',monospace] text-4xl md:text-6xl font-extrabold text-white mb-4">
                        Research &{" "}
                        <span className="text-cyan-400" style={{ textShadow: "0 0 30px rgba(0,245,255,0.5)" }}>
              Discoveries
            </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        CVE discoveries, public exploits, and bug bounty achievements.
                    </p>
                </div>

                {/* ── Stats ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14">
                    {statsData.map((s, i) => (
                        <div key={i}
                             className={`relative text-center p-6 bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)]
                hover:border-[rgba(0,245,255,0.3)] hover:scale-105 transition-all duration-300
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-8 before:h-0.5 ${s.accent}`}
                        >
                            <div className={`font-['Oxanium',monospace] text-3xl md:text-4xl font-extrabold ${s.color} ${s.glow}`}>
                                {s.value}
                            </div>
                            <div className="font-['Oxanium',monospace] text-[0.62rem] tracking-[2px] uppercase text-slate-500 mt-2">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Tabs ── */}
                <div className="flex justify-center mb-10">
                    <div className="flex gap-0 border border-[rgba(0,245,255,0.15)] bg-[#070d1a]/80">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = selected === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => handleTabChange(tab.key)}
                                    className={`relative flex items-center gap-2 px-6 py-3 font-['Oxanium',monospace] text-[0.72rem] font-bold tracking-[2px] uppercase transition-all duration-200
                    ${isActive
                                        ? "bg-cyan-400/15 text-cyan-400 border-b-2 border-cyan-400 shadow-[0_4px_20px_rgba(0,245,255,0.1)]"
                                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                    <span className={`ml-1 text-[0.58rem] px-1.5 py-0.5 rounded-none font-bold
                    ${isActive ? "bg-cyan-400 text-[#040810]" : "bg-[rgba(0,245,255,0.08)] text-slate-500"}`}>
                    {tab.count}
                  </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Content ── */}
                <div className={`transition-all duration-300 ${animateContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    {selected === "cves" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cves.map((cve, i) => <CVECard key={cve.id} cve={cve} index={i} />)}
                        </div>
                    )}
                    {selected === "exploits" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {exploits.map((ex, i) => <ExploitCard key={ex.id} exploit={ex} index={i} />)}
                        </div>
                    )}
                    {selected === "bounties" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bugBounties.map((b, i) => <BugBountyCard key={b.id} bounty={b} index={i} />)}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}