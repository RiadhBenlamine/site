// app/projects/page.tsx
"use client";

import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Terminal, Globe, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Project {
    title: string;
    description: string;
    tags: string[];
    github?: string;
    demo?: string;
    icon: any;
    type: string;
    accentColor: "cyan" | "magenta" | "green";
}

const projects: Project[] = [
    {
        title: "Apache-logger",
        description: "Apache log analyzer, lightweight log parser for cybersecurity analysts. Surfaces suspicious activity from raw access logs instantly.",
        tags: ["Python", "Log analysis"],
        github: "https://github.com/RiadhBenlamine/Apache-logger",
        icon: Lock,
        type: "BLUETEAM TOOL",
        accentColor: "cyan",
    },
    {
        title: "Infostealer",
        description: "Fully undetectable POC stealing browser passwords. Demonstrates credential extraction techniques for red team operations and security research.",
        tags: ["C++", "Malware", "Red-team Op"],
        github: "https://github.com/RiadhBenlamine/infostealer",
        icon: Lock,
        type: "OFFENSIVE SECURITY",
        accentColor: "magenta",
    },
    {
        title: "Gmail-Shell",
        description: "Windows-based C2 agent using Gmail as a covert command-and-control channel. Demonstrates creative post-exploitation techniques.",
        tags: ["Python", "Post-Exploitation"],
        github: "https://github.com/RiadhBenlamine/gmail-shell",
        icon: Terminal,
        type: "POST-EXPLOITATION",
        accentColor: "magenta",
    },
    {
        title: "SmartMedica",
        description: "Web-based Software for small-medium sized clinics. Giving full environment tools needed in clinics",
        tags: ["Python", "Software", "NextJs"],
        github: "https://github.com/RiadhBenlamine",
        demo : "https://smartmedica-frontend.vercel.app",
        icon: Globe,
        type: "Software",
        accentColor: "green",
    },

];

const accentMap = {
    cyan: {
        typeColor: "text-cyan-400",
        tagStyle: "text-cyan-400 border-cyan-400/25 bg-cyan-400/10",
        btnStyle: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400 hover:text-[#040810] hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]",
        scanLine: "from-transparent via-cyan-400 to-transparent",
        thumbLabel: "text-cyan-400 border-cyan-400/30",
        cornerBracket: "border-cyan-400",
        cardHover: "hover:border-[rgba(0,245,255,0.35)] hover:shadow-[0_0_30px_rgba(0,245,255,0.08)]",
        iconColor: "text-cyan-400/25",
        borderLeft: "border-l-cyan-400/40",
    },
    magenta: {
        typeColor: "text-pink-500",
        tagStyle: "text-pink-500 border-pink-500/25 bg-pink-500/10",
        btnStyle: "text-pink-500 border-pink-500/30 bg-pink-500/10 hover:bg-pink-500 hover:text-[#040810] hover:shadow-[0_0_20px_rgba(255,0,110,0.4)]",
        scanLine: "from-transparent via-pink-500 to-transparent",
        thumbLabel: "text-pink-500 border-pink-500/30",
        cornerBracket: "border-pink-500",
        cardHover: "hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(255,0,110,0.06)]",
        iconColor: "text-pink-500/25",
        borderLeft: "border-l-pink-500/40",
    },
    green: {
        typeColor: "text-green-400",
        tagStyle: "text-green-400 border-green-400/25 bg-green-400/10",
        btnStyle: "text-green-400 border-green-400/30 bg-green-400/10 hover:bg-green-400 hover:text-[#040810] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]",
        scanLine: "from-transparent via-green-400 to-transparent",
        thumbLabel: "text-green-400 border-green-400/30",
        cornerBracket: "border-green-400",
        cardHover: "hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.06)]",
        iconColor: "text-green-400/25",
        borderLeft: "border-l-green-400/40",
    },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const a = accentMap[project.accentColor];
    const Icon = project.icon;

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
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: `${index * 120}ms` }}
        >
            <div className={`relative flex flex-col h-full bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)] border-l-2 ${a.borderLeft}
        backdrop-blur-md ${a.cardHover} transition-all duration-300 group hover:-translate-y-1.5`}>
                {/* Corner brackets */}
                <span className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${a.cornerBracket} pointer-events-none z-10`} />
                <span className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${a.cornerBracket} pointer-events-none z-10`} />

                {/* Thumbnail */}
                <div className="relative h-44 bg-gradient-to-br from-[#0a1128] to-[#070d1a] overflow-hidden border-b border-[rgba(0,245,255,0.08)] flex items-center justify-center">
                    {/* diagonal stripe pattern */}
                    <div className="absolute inset-0 opacity-100"
                         style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,245,255,0.015) 10px,rgba(0,245,255,0.015) 11px)" }}
                    />
                    <Icon className={`w-20 h-20 ${a.iconColor} group-hover:scale-110 transition-transform duration-500`} />
                    {/* Scan line animation */}
                    <div className={`absolute left-0 right-0 h-0.5 bg-gradient-to-r ${a.scanLine} animate-scan-line`} />
                    {/* Label */}
                    <span className={`absolute bottom-3 left-3 font-['Oxanium',monospace] text-[0.58rem] tracking-[2px] uppercase px-2 py-0.5 border bg-[#040810]/80 ${a.thumbLabel}`}>
            {project.type}
          </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className={`font-['Oxanium',monospace] text-[0.6rem] tracking-[3px] uppercase ${a.typeColor} flex items-center gap-2`}>
                        <span className="text-slate-600">//</span> {project.type}
                    </div>
                    <h3 className="font-['Oxanium',monospace] text-xl font-bold text-white group-hover:text-opacity-90 tracking-wide">
                        {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-light flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.map((tag, i) => (
                            <span key={i} className={`font-['Oxanium',monospace] text-[0.6rem] tracking-wide border px-2.5 py-0.5 ${a.tagStyle}`}>
                {tag}
              </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3 border-t border-[rgba(0,245,255,0.07)] pt-4">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 font-['Oxanium',monospace] text-[0.68rem] font-bold tracking-[2px] uppercase px-4 py-2.5 border transition-all duration-200 ${a.btnStyle}`}
                        >
                            <FaGithub className="w-3.5 h-3.5" /> Code
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 font-['Oxanium',monospace] text-[0.68rem] font-bold tracking-[2px] uppercase px-4 py-2.5 border transition-all duration-200 ${a.btnStyle}`}
                        >
                            <FaExternalLinkAlt className="w-3 h-3" /> Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
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

    return (
        <section className="relative min-h-screen bg-[#040810] overflow-hidden">
            <style>{`
        @keyframes scan-line {
          0% { top: 0; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          position: absolute;
          animation: scan-line 3s ease-in-out infinite;
        }
      `}</style>

            {/* Grid */}
            <div className="pointer-events-none fixed inset-0"
                 style={{ backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
            />
            {/* Ambient */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(0,245,255,0.06)_0%,transparent_70%)]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(255,0,110,0.05)_0%,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-6 py-8 relative z-10">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
                >
                    <div className="inline-flex items-center gap-2 font-['Oxanium',monospace] text-[0.65rem] font-semibold tracking-[3px] uppercase text-cyan-400 border border-cyan-400/30 px-5 py-2 bg-cyan-400/10 mb-6"
                         style={{ clipPath: "polygon(8px 0%,calc(100% - 8px) 0%,100% 50%,calc(100% - 8px) 100%,8px 100%,0% 50%)" }}>
                        ◈ MY WORK
                    </div>
                    <h2 className="font-['Oxanium',monospace] text-4xl md:text-6xl font-extrabold text-white mb-4">
                        Featured{" "}
                        <span className="text-cyan-400" style={{ textShadow: "0 0 30px rgba(0,245,255,0.5)" }}>
              Projects
            </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Security tools, exploits, and research projects built to enhance penetration testing and vulnerability discovery.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="font-['Oxanium',monospace] text-[0.72rem] tracking-[2px] uppercase text-slate-500 mb-5">
                        More projects on GitHub
                    </p>
                    <a
                        href="https://github.com/RiadhBenlamine"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 font-['Oxanium',monospace] text-[0.75rem] font-bold tracking-[3px] uppercase text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-8 py-3 hover:bg-cyan-400 hover:text-[#040810] hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all duration-300"
                        style={{ clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}
                    >
                        <FaGithub className="w-4 h-4" /> View All on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}