// app/experience/page.tsx
"use client";

import { Calendar, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ExperienceItem {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    tags: string[];
    type: "work" | "education" | "certification";
}

const experiences: ExperienceItem[] = [
    {
        title: "Certified Phishing Prevention Specialist (CPPS)",
        company: "Hack and Fix",
        location: "Remote",
        period: "2025/12/28",
        description: [
            "Obtained knowledge and skills to identify, prevent, and respond to phishing threats",
        ],
        tags: ["Security Awareness", "Social Engineering"],
        type: "certification",
    },
    {
        title: "Junior Penetration Tester",
        company: "Ingrata:Sec",
        location: "Remote",
        period: "2020 (1 month Contract)",
        description: [
            "Performed vulnerability assessments for corporate clients",
            "Assisted in basic Active Directory enumeration and privilege escalation testing",
            "Documented findings and provided remediation recommendations",
            "Conducted OSINT investigations to gather publicly available information on targets",
        ],
        tags: ["Vulnerability Assessment", "OSINT", "Python", "Active Directory testing"],
        type: "work",
    },
    {
        title: "IT Support",
        company: "Self employed",
        location: "Blida, Algeria",
        period: "2019 - 2020",
        description: [
            "Provided technical support for 20+ Windows-based computers",
            "Installed, configured, and maintained Windows 10 systems and software",
            "Performed system reinstallation, driver configuration, and malware removal",
            "Diagnosed and resolved hardware, software, and network connectivity issues",
            "Troubleshooting Android/IOS smartphones",
        ],
        tags: ["IT support", "IT system management"],
        type: "work",
    },
];

const typeConfig = {
    work: {
        label: "Work Experience",
        dotColor: "bg-cyan-400",
        dotRing: "ring-cyan-400/30",
        dotGlow: "shadow-[0_0_12px_rgba(0,245,255,0.6)]",
        badgeStyle:
            "text-cyan-400 border border-cyan-400/30 bg-cyan-400/10",
        lineColor: "from-cyan-400/50",
        cardAccent: "border-l-cyan-400/40",
    },
    education: {
        label: "Education",
        dotColor: "bg-green-400",
        dotRing: "ring-green-400/30",
        dotGlow: "shadow-[0_0_12px_rgba(57,255,20,0.6)]",
        badgeStyle:
            "text-green-400 border border-green-400/30 bg-green-400/10",
        lineColor: "from-green-400/50",
        cardAccent: "border-l-green-400/40",
    },
    certification: {
        label: "Certification",
        dotColor: "bg-amber-400",
        dotRing: "ring-amber-400/30",
        dotGlow: "shadow-[0_0_12px_rgba(255,214,10,0.6)]",
        badgeStyle:
            "text-amber-400 border border-amber-400/30 bg-amber-400/10",
        lineColor: "from-amber-400/50",
        cardAccent: "border-l-amber-400/40",
    },
};

function ExperienceCard({
                            experience,
                            index,
                        }: {
    experience: ExperienceItem;
    index: number;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const cfg = typeConfig[experience.type];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => {
            if (cardRef.current) observer.unobserve(cardRef.current);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`flex gap-6 transition-all duration-700 ${
                isVisible
                    ? "opacity-100 translate-x-0"
                    : index % 2 === 0
                        ? "opacity-0 -translate-x-16"
                        : "opacity-0 translate-x-16"
            }`}
            style={{ transitionDelay: `${index * 120}ms` }}
        >
            {/* Timeline column */}
            <div className="flex flex-col items-center">
                <div
                    className={`w-4 h-4 rounded-full mt-6 ${cfg.dotColor} ring-4 ${cfg.dotRing} ${cfg.dotGlow} z-10 flex-shrink-0`}
                />
                <div
                    className={`w-px flex-1 bg-gradient-to-b ${cfg.lineColor} to-transparent mt-1`}
                />
            </div>

            {/* Card */}
            <div
                className={`flex-1 mb-8 relative bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)] border-l-2 ${cfg.cardAccent}
          backdrop-blur-md hover:border-[rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.06)]
          transition-all duration-300 group`}
            >
                {/* corner brackets */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                <div className="p-6 flex flex-col gap-4">
                    {/* Badge */}
                    <span
                        className={`self-start font-['Oxanium',monospace] text-[0.6rem] font-bold tracking-[2px] uppercase px-3 py-1 ${cfg.badgeStyle}`}
                    >
            {cfg.label}
          </span>

                    {/* Title & Company */}
                    <div>
                        <h3 className="font-['Oxanium',monospace] text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {experience.title}
                        </h3>
                        <p className="font-['Oxanium',monospace] text-cyan-400 font-medium mt-1 text-sm tracking-wide">
                            {experience.company}
                        </p>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-['Oxanium',monospace] tracking-wide">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
                {experience.location}
            </span>
                        <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
                            {experience.period}
            </span>
                    </div>

                    {/* Description */}
                    <ul className="flex flex-col gap-2">
                        {experience.description.map((item, i) => (
                            <li key={i} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
                                <span className="text-cyan-400 mt-0.5 flex-shrink-0">▸</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                        {experience.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="font-['Oxanium',monospace] text-[0.62rem] tracking-wide text-slate-400 border border-[rgba(0,245,255,0.15)] px-2 py-0.5"
                            >
                {tag}
              </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const stats = [
    {
        value: experiences.filter((e) => e.type === "work").length,
        label: "Work Experiences",
        color: "text-cyan-400",
        glow: "shadow-[0_0_20px_rgba(0,245,255,0.3)]",
        accent: "before:bg-cyan-400",
    },
    {
        value: experiences.filter((e) => e.type === "education").length,
        label: "Education",
        color: "text-green-400",
        glow: "shadow-[0_0_20px_rgba(57,255,20,0.3)]",
        accent: "before:bg-green-400",
    },
    {
        value: experiences.filter((e) => e.type === "certification").length,
        label: "Certifications",
        color: "text-amber-400",
        glow: "shadow-[0_0_20px_rgba(255,214,10,0.3)]",
        accent: "before:bg-amber-400",
    },
    {
        value: "1.5+",
        label: "Years Active",
        color: "text-cyan-400",
        glow: "shadow-[0_0_20px_rgba(0,245,255,0.3)]",
        accent: "before:bg-cyan-400",
    },
];

export default function Experience() {
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
            {/* Grid background */}
            <div
                className="pointer-events-none fixed inset-0 opacity-100"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            {/* Ambient glow */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(0,245,255,0.06)_0%,transparent_70%)]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(255,0,110,0.05)_0%,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-6 py-8 relative z-10">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-20 transition-all duration-1000 ${
                        headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                    }`}
                >
                    <div className="inline-flex items-center gap-2 font-['Oxanium',monospace] text-[0.65rem] font-semibold tracking-[3px] uppercase text-cyan-400 border border-cyan-400/30 px-5 py-2 bg-cyan-400/10 mb-6"
                         style={{ clipPath: "polygon(8px 0%,calc(100% - 8px) 0%,100% 50%,calc(100% - 8px) 100%,8px 100%,0% 50%)" }}
                    >
                        ◈ MY JOURNEY
                    </div>
                    <h2 className="font-['Oxanium',monospace] text-4xl md:text-6xl font-extrabold text-white mb-4">
                        Experience &{" "}
                        <span className="text-cyan-400" style={{ textShadow: "0 0 30px rgba(0,245,255,0.5)" }}>
              Certifications
            </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        My professional journey in IT and cybersecurity, from learning the fundamentals to hunting vulnerabilities.
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto">
                    {experiences.map((exp, idx) => (
                        <ExperienceCard key={idx} experience={exp} index={idx} />
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className={`relative text-center p-6 bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)]
                hover:border-[rgba(0,245,255,0.3)] hover:scale-105 transition-all duration-300
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-8 before:h-0.5 ${s.accent}`}
                        >
                            <div className={`font-['Oxanium',monospace] text-3xl md:text-4xl font-extrabold ${s.color} ${s.glow}`}>
                                {s.value}
                            </div>
                            <div className="text-xs tracking-[2px] uppercase text-slate-500 mt-2 font-['Oxanium',monospace]">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}