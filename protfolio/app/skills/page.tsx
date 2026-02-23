// app/skills/page.tsx
"use client";

import {
    Shield, Code, Database, Globe, Lock, Terminal, Wifi, Server,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Skill {
    name: string;
    level: number;
    category: string;
    icon: any;
}

const skills: Skill[] = [
    { name: "Penetration Testing", level: 65, category: "Security", icon: Shield },
    { name: "Python / C++", level: 80, category: "Programming", icon: Code },
    { name: "Networking", level: 70, category: "Systems", icon: Wifi },
    { name: "Data Security", level: 75, category: "Security", icon: Lock },
    { name: "Linux", level: 92, category: "Systems", icon: Terminal },
    { name: "OWASP Top 10", level: 80, category: "Security", icon: Globe },
    { name: "Log Analysis", level: 90, category: "Analysis", icon: Code },
    { name: "Windows Server 2022", level: 72, category: "Systems", icon: Server },
    { name: "Database Management", level: 74, category: "Systems", icon: Database },
];

function getLevelLabel(level: number) {
    if (level >= 85) return { label: "EXPERT", style: "text-green-400 border-green-400/30 bg-green-400/10", barColor: "from-green-400 to-green-400/60", barGlow: "shadow-[0_0_8px_#39ff14]", dotColor: "bg-green-400 shadow-[0_0_10px_#39ff14]", pctColor: "text-green-400" };
    if (level >= 70) return { label: "ADVANCED", style: "text-amber-400 border-amber-400/30 bg-amber-400/10", barColor: "from-amber-400 to-amber-400/60", barGlow: "shadow-[0_0_8px_rgba(255,214,10,0.8)]", dotColor: "bg-amber-400 shadow-[0_0_10px_rgba(255,214,10,0.8)]", pctColor: "text-amber-400" };
    return { label: "INTERMEDIATE", style: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10", barColor: "from-cyan-400 to-cyan-400/60", barGlow: "shadow-[0_0_8px_rgba(0,245,255,0.8)]", dotColor: "bg-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.8)]", pctColor: "text-cyan-400" };
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedLevel, setAnimatedLevel] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const cfg = getLevelLabel(skill.level);
    const Icon = skill.icon;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    const timer = setTimeout(() => {
                        let current = 0;
                        const interval = setInterval(() => {
                            current += 1;
                            setAnimatedLevel(current);
                            if (current >= skill.level) clearInterval(interval);
                        }, 14);
                    }, index * 80);
                    return () => clearTimeout(timer);
                }
            },
            { threshold: 0.1 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
    }, [skill.level, index]);

    return (
        <div
            ref={cardRef}
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 60}ms` }}
        >
            <div className="relative bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)] backdrop-blur-md
        hover:border-[rgba(0,245,255,0.35)] hover:shadow-[0_0_30px_rgba(0,245,255,0.08)]
        transition-all duration-300 group h-full p-6 flex flex-col gap-4">
                {/* Corner brackets */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

                {/* Icon + Name */}
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 flex items-center justify-center bg-cyan-400/10 border border-cyan-400/25
            group-hover:bg-cyan-400/20 transition-colors duration-300 flex-shrink-0"
                         style={{ clipPath: "polygon(5px 0%,calc(100% - 5px) 0%,100% 50%,calc(100% - 5px) 100%,5px 100%,0% 50%)" }}
                    >
                        <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="font-['Oxanium',monospace] font-bold text-white group-hover:text-cyan-400 transition-colors text-sm">
                            {skill.name}
                        </h3>
                        <p className="font-['Oxanium',monospace] text-[0.6rem] tracking-[2px] text-slate-500 uppercase mt-0.5">
                            {skill.category}
                        </p>
                    </div>
                </div>

                {/* Badge */}
                <span className={`self-start font-['Oxanium',monospace] text-[0.58rem] font-bold tracking-[2px] uppercase px-2.5 py-0.5 border ${cfg.style}`}>
          {cfg.label}
        </span>

                {/* Bar */}
                <div className="flex flex-col gap-1.5 mt-auto">
                    <div className="flex justify-between items-center">
                        <span className="font-['Oxanium',monospace] text-[0.65rem] tracking-wide text-slate-500">Proficiency</span>
                        <span className={`font-['Oxanium',monospace] text-[0.7rem] font-bold ${cfg.pctColor}`}>{animatedLevel}%</span>
                    </div>
                    <div className="h-1 bg-white/5 relative overflow-visible">
                        <div
                            className={`h-full bg-gradient-to-r ${cfg.barColor} ${cfg.barGlow} relative transition-all duration-1000`}
                            style={{ width: `${animatedLevel}%` }}
                        >
                            <span className={`absolute right-[-3px] top-[-3px] w-[7px] h-[7px] rounded-full ${cfg.dotColor}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ value, label, index }: { value: number | string; label: string; index: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedValue, setAnimatedValue] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    const numValue = typeof value === "string" ? parseInt(value) : value;
                    const timer = setTimeout(() => {
                        let c = 0;
                        const interval = setInterval(() => {
                            c++;
                            setAnimatedValue(c);
                            if (c >= numValue) clearInterval(interval);
                        }, 40);
                    }, index * 100);
                    return () => clearTimeout(timer);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, [value, index]);

    return (
        <div
            ref={ref}
            className={`relative text-center p-6 bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)]
        hover:border-[rgba(0,245,255,0.3)] hover:scale-105 transition-all duration-500
        before:content-[''] before:absolute before:top-0 before:left-0 before:w-8 before:h-0.5 before:bg-cyan-400
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="font-['Oxanium',monospace] text-3xl md:text-4xl font-extrabold text-cyan-400"
                 style={{ textShadow: "0 0 20px rgba(0,245,255,0.4)" }}>
                {typeof value === "string" && value.includes("%") ? `${animatedValue}%` : animatedValue}
            </div>
            <div className="font-['Oxanium',monospace] text-[0.65rem] tracking-[2px] uppercase text-slate-500 mt-2">
                {label}
            </div>
        </div>
    );
}

export default function Skills() {
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
                        ◈ CAPABILITIES
                    </div>
                    <h2 className="font-['Oxanium',monospace] text-4xl md:text-6xl font-extrabold text-white mb-4">
                        Skills &{" "}
                        <span className="text-cyan-400" style={{ textShadow: "0 0 30px rgba(0,245,255,0.5)" }}>
              Expertise
            </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Technologies and security tools I work with to find vulnerabilities and build secure systems.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {skills.map((skill, index) => (
                        <SkillCard key={index} skill={skill} index={index} />
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
                    <StatCard value={skills.filter((s) => s.level >= 85).length} label="Expert Skills" index={0} />
                    <StatCard value={skills.filter((s) => s.level >= 70 && s.level < 85).length} label="Advanced" index={1} />
                    <StatCard value={skills.length} label="Total Skills" index={2} />
                    <StatCard value={`${Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length)}%`} label="Avg Level" index={3} />
                </div>
            </div>
        </section>
    );
}