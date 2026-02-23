// app/about/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Code, Terminal, Cpu } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiMedium } from "react-icons/si";

const highlights = [
    { icon: Shield, label: "Penetration Tester", desc: "Offensive security assessments and adversary simulation" },
    { icon: Terminal, label: "Tool Developer", desc: "Custom security tooling in Python and C++" },
    { icon: Code, label: "Security Researcher", desc: "CVE research, reverse engineering, malware analysis" },
    { icon: Cpu, label: "SOC & Log Analysis", desc: "Detection engineering and anomaly hunting" },
];

export default function AboutPage() {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.05 }
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section className="relative min-h-screen bg-[#040810] overflow-hidden">
            {/* Grid */}
            <div
                className="pointer-events-none fixed inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Ambient */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(0,245,255,0.06)_0%,transparent_70%)]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(255,0,110,0.05)_0%,transparent_70%)]" />
            </div>

            <div ref={ref} className="container mx-auto px-6 py-8 relative z-10 max-w-5xl">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                    <div
                        className="inline-flex items-center gap-2 font-['Oxanium',monospace] text-[0.65rem] font-semibold tracking-[3px] uppercase text-cyan-400 border border-cyan-400/30 px-5 py-2 bg-cyan-400/10 mb-6"
                        style={{ clipPath: "polygon(8px 0%,calc(100% - 8px) 0%,100% 50%,calc(100% - 8px) 100%,8px 100%,0% 50%)" }}
                    >
                        ◈ ABOUT ME
                    </div>

                    <h1 className="font-['Oxanium',monospace] text-4xl md:text-6xl font-extrabold text-white mb-4">
                        Who I <span className="text-cyan-400" style={{ textShadow: "0 0 30px rgba(0,245,255,0.5)" }}>Am</span>
                    </h1>

                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Cybersecurity enthusiast and junior penetration tester focused on offensive security, vulnerability research,
                        and building tools that expose attacker tradecraft.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Avatar */}
                    <div className={`transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
                        <div className="relative flex items-center justify-center py-12">
                            <div className="absolute w-72 h-72 border border-[rgba(0,245,255,0.15)] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-[morph_8s_ease-in-out_infinite]" />
                            <div className="absolute w-56 h-56 border border-[rgba(0,245,255,0.1)] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-[morph_8s_ease-in-out_infinite_reverse]" />

                            <div className="relative w-40 h-40 flex items-center justify-center bg-gradient-to-br from-cyan-400/10 to-pink-500/5 border border-[rgba(0,245,255,0.2)] rounded-full animate-[morph_10s_ease-in-out_infinite]">
                                <span className="font-['Oxanium',monospace] text-4xl font-extrabold text-cyan-400" style={{ textShadow: "0 0 30px rgba(0,245,255,0.6)" }}>
                                    RBN
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className={`flex flex-col gap-6 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
                        <div className="flex flex-col gap-4 text-slate-400 font-light leading-relaxed text-sm">
                            <p>
                                I’m <span className="text-white font-semibold">Riadh Benalmine</span>, a cybersecurity enthusiast and junior penetration tester with
                                strong hands-on experience in <span className="text-cyan-400">offensive security</span>,
                                web application security, and Linux-based environments.
                            </p>

                            <p>
                                I actively work on platforms like <span className="text-white">Hack The Box</span> and <span className="text-white">BTLO</span>,
                                achieving top global rankings. My experience includes building security tools in
                                <span className="text-white"> Python</span> and <span className="text-white"> C++</span>,
                                reverse engineering crackme binaries, writing detection and automation scripts,
                                and contributing a <span className="text-cyan-400">CVE</span>.
                            </p>

                            <p>
                                Beyond pentesting, I build full-stack applications using <span className="text-white">Django</span> and
                                <span className="text-white"> Next.js</span>, focusing on secure design, input validation,
                                and real-world attack scenarios. My interests include red team tooling,
                                EDR evasion concepts, network security, and SOC operations.
                            </p>

                            <p>
                                I’m currently strengthening my networking and defensive security fundamentals while preparing
                                for industry certifications and real-world security roles. Learning by doing is my core philosophy.
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex gap-3 pt-2">
                            <a
                                href="https://github.com/RiadhBenlamine"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-['Oxanium',monospace] text-[0.7rem] font-bold tracking-[2px] uppercase px-5 py-2.5 text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400 hover:text-[#040810] transition-all"
                            >
                                <FaGithub className="w-4 h-4" /> GitHub
                            </a>

                            <a
                                href="https://medium.com/@rbn0x00"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-['Oxanium',monospace] text-[0.7rem] font-bold tracking-[2px] uppercase px-5 py-2.5 text-slate-400 border border-[rgba(0,245,255,0.15)] hover:text-white transition-all"
                            >
                                <SiMedium className="w-4 h-4" /> Blog
                            </a>
                        </div>
                    </div>
                </div>

                {/* What I Do */}
                <div className={`mt-20 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="text-center mb-10">
                        <h2 className="font-['Oxanium',monospace] text-2xl font-bold text-white">
                            What I <span className="text-cyan-400">Do</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {highlights.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)] p-6 text-center hover:border-cyan-400/40 hover:scale-105 transition-all">
                                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-cyan-400/10 border border-cyan-400/25">
                                        <Icon className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <h4 className="font-['Oxanium',monospace] font-bold text-white text-sm mb-2">
                                        {item.label}
                                    </h4>
                                    <p className="text-slate-500 text-xs">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}