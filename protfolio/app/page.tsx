// app/page.tsx
"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Skills from "./skills/page";
import Projects from "./projects/page";
import Experience from "@/app/experience/page";

// ─── TYPEWRITER HOOK ────────────────────────────────────────────────────────
function useTypewriter(strings: string[], delay = 80, deleteSpeed = 40, pause = 1800) {
    const [displayed, setDisplayed] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = strings[index % strings.length];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && displayed === current) {
            timeout = setTimeout(() => setIsDeleting(true), pause);
        } else if (isDeleting && displayed === "") {
            setIsDeleting(false);
            setIndex((i) => (i + 1) % strings.length);
        } else {
            timeout = setTimeout(() => {
                setDisplayed((prev) =>
                    isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
                );
            }, isDeleting ? deleteSpeed : delay);
        }
        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, index, strings, delay, deleteSpeed, pause]);

    return displayed;
}

// ─── PARTICLE FIELD ─────────────────────────────────────────────────────────
function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // particles
        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.5 + 0.3,
            opacity: Math.random() * 0.4 + 0.1,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,245,255,${p.opacity})`;
                ctx.fill();
            });

            // draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

// ─── GLITCH TEXT ─────────────────────────────────────────────────────────────
function GlitchText({ text, className = "" }: { text: string; className?: string }) {
    return (
        <span className={`relative inline-block ${className}`} data-text={text}>
      {text}
            <style>{`
        @keyframes glitch-1 {
          0%,100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          10% { clip-path: inset(10% 0 60% 0); transform: translate(-3px, 1px); }
          20% { clip-path: inset(50% 0 30% 0); transform: translate(3px, -1px); }
          30% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40%,90% { clip-path: inset(0 0 100% 0); transform: translate(0); }
        }
        @keyframes glitch-2 {
          0%,100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          15% { clip-path: inset(20% 0 50% 0); transform: translate(4px, -2px); }
          25% { clip-path: inset(60% 0 20% 0); transform: translate(-4px, 1px); }
          35% { clip-path: inset(90% 0 2% 0); transform: translate(2px, -3px); }
          45%,95% { clip-path: inset(0 0 100% 0); transform: translate(0); }
        }
        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .glitch::before {
          color: rgba(255,0,110,0.7);
          animation: glitch-1 6s ease-in-out infinite;
        }
        .glitch::after {
          color: rgba(0,245,255,0.7);
          animation: glitch-2 6s ease-in-out infinite 0.5s;
        }
      `}</style>
    </span>
    );
}

// ─── HERO VISUAL ─────────────────────────────────────────────────────────────
function HeroVisual({ isLoaded }: { isLoaded: boolean }) {
    return (
        <div className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}>
            <style>{`
        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes morph-hero {
          0%,100% { border-radius: 30% 70% 70% 30%/30% 30% 70% 70%; }
          25% { border-radius: 50% 50% 30% 70%/50% 70% 30% 50%; }
          50% { border-radius: 70% 30% 50% 50%/60% 40% 60% 40%; }
          75% { border-radius: 40% 60% 70% 30%/40% 50% 50% 60%; }
        }
        @keyframes float-tag {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-core {
          0%,100% { box-shadow: 0 0 40px rgba(0,245,255,0.3), 0 0 80px rgba(0,245,255,0.1); }
          50% { box-shadow: 0 0 60px rgba(0,245,255,0.5), 0 0 120px rgba(0,245,255,0.2); }
        }
        @keyframes hacker-float {
          0%,100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }
      `}</style>

            {/* Orbit rings */}
            <div className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-[rgba(0,245,255,0.1)]"
                 style={{ animation: "orbit-spin 25s linear infinite" }}>
                <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
            </div>
            <div className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-[rgba(255,0,110,0.08)]"
                 style={{ animation: "orbit-spin-rev 35s linear infinite" }}>
                <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_6px_rgba(255,0,110,0.8)]" />
            </div>

            {/* Morphing blob behind */}
            <div className="absolute w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-pink-500/5 border border-[rgba(0,245,255,0.15)]"
                 style={{ animation: "morph-hero 10s ease-in-out infinite", borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%" }}
            />

            {/* Hacker image */}
            <div className="relative z-10 w-64 h-64 flex items-center justify-center"
                 style={{ animation: "hacker-float 4s ease-in-out infinite" }}>
                <div className="absolute inset-0 rounded-full"
                     style={{ animation: "pulse-core 3s ease-in-out infinite" }} />
                <img
                    src="/hacker.png"
                    alt="Hacker"
                    className="w-56 h-56 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(0,245,255,0.3)]"
                    onError={(e) => {
                        // fallback if image missing
                        (e.target as HTMLImageElement).style.display = "none";
                    }}
                />
                {/* Fallback avatar text if no image */}
                <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-['Oxanium',monospace] text-5xl font-extrabold text-cyan-400/20"
                style={{ textShadow: "0 0 40px rgba(0,245,255,0.4)" }}>
            RBN
          </span>
                </div>
            </div>

            {/* Corner scan brackets */}
            <div className="absolute w-72 h-72 pointer-events-none">
                <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
                <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
                <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
                <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
            </div>

            {/* Floating skill tags */}
            {[
                { text: "◆ OSINT", top: "8%", left: "-8%", color: "text-cyan-400 border-cyan-400/30", delay: "0s" },
                { text: "◆ RED TEAM", bottom: "10%", right: "-5%", color: "text-pink-500 border-pink-500/30", delay: "1.5s" },
                { text: "◆ CVE HUNTER", top: "45%", left: "-15%", color: "text-green-400 border-green-400/30", delay: "0.8s" },
                { text: "◆ CTF PLAYER", top: "12%", right: "-5%", color: "text-amber-400 border-amber-400/30", delay: "2s" },
            ].map((tag, i) => (
                <div key={i}
                     className={`absolute font-['Oxanium',monospace] text-[0.6rem] tracking-wide ${tag.color} bg-[#040810]/90 border px-2.5 py-1 whitespace-nowrap`}
                     style={{
                         top: tag.top, bottom: (tag as any).bottom,
                         left: tag.left, right: (tag as any).right,
                         animation: `float-tag 3s ease-in-out infinite ${tag.delay}`,
                     }}>
                    {tag.text}
                </div>
            ))}
        </div>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const typeStrings = [
    "Cybersecurity Enthusiast",
    "CTF Player",
    "Security Researcher",
    "Penetration Tester",
];

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
    const typed = useTypewriter(typeStrings);

    useEffect(() => {
        const t = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            {/* ── HERO ── */}
            <section
                id="home"
                className="relative min-h-screen bg-[#040810] overflow-hidden flex items-center"
            >
                {/* Background grid */}
                <div className="pointer-events-none absolute inset-0"
                     style={{ backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
                />
                {/* Particle field */}
                <ParticleField />
                {/* Ambient glows */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(0,245,255,0.07)_0%,transparent_70%)]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(255,0,110,0.05)_0%,transparent_70%)]" />
                </div>

                <div className="container mx-auto px-6 py-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">

                        {/* ── LEFT: TEXT ── */}
                        <div className={`flex flex-col gap-7 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}>

                            {/* Pre-title */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-px bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
                                <span className="font-['Oxanium',monospace] text-[0.65rem] tracking-[4px] uppercase text-cyan-400">
                  Security Researcher · Algeria
                </span>
                            </div>

                            {/* Name */}
                            <div>
                                <p className="font-['Oxanium',monospace] text-slate-500 text-sm tracking-[3px] uppercase mb-2">
                                    Hey, I&apos;m
                                </p>
                                <h1 className="font-['Oxanium',monospace] font-extrabold leading-none text-white"
                                    style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
                                    <GlitchText text="Riadh" className="glitch" />
                                    <br />
                                    <span className="text-cyan-400" style={{ textShadow: "0 0 30px rgba(0,245,255,0.5)" }}>
                    Benlamine
                  </span>
                                </h1>
                            </div>

                            {/* Typewriter */}
                            <div className="flex items-center gap-3 h-8">
                                <span className="text-pink-500 font-['Oxanium',monospace] text-sm">~/</span>
                                <span className="font-['Oxanium',monospace] text-lg font-semibold text-white tracking-wide">
                  {typed}
                </span>
                                <span className="w-0.5 h-5 bg-cyan-400 animate-[blink_1s_step-end_infinite] shadow-[0_0_6px_rgba(0,245,255,0.8)]" />
                                <style>{`@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }`}</style>
                            </div>

                            {/* Description */}
                            <p className="text-slate-400 text-base leading-relaxed font-light max-w-lg">
                                Cybersecurity enthusiast and ethical hacker with hands-on experience solving CTF challenges,
                                analyzing complex systems, and building practical security tools. I thrive on uncovering
                                vulnerabilities, learning advanced techniques, and applying my skills to real-world security problems.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 items-center">
                                <a href="#projects"
                                   className="inline-flex items-center gap-2 font-['Oxanium',monospace] text-[0.75rem] font-bold tracking-[3px] uppercase text-[#040810] bg-cyan-400 px-7 py-3 hover:bg-white hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all duration-300 hover:-translate-y-0.5"
                                   style={{ clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}>
                                    ⬡ View Projects
                                </a>
                                <a href="#experience"
                                   className="inline-flex items-center gap-2 font-['Oxanium',monospace] text-[0.75rem] font-bold tracking-[3px] uppercase text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-7 py-3 hover:bg-cyan-400 hover:text-[#040810] hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-300 hover:-translate-y-0.5"
                                   style={{ clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}>
                                    ⬡ My Journey
                                </a>

                                {/* Social icons */}
                                <div className="flex gap-3 ml-1">
                                    <a href="https://github.com/RiadhBenlamine/" target="_blank" rel="noopener noreferrer"
                                       className="w-10 h-10 flex items-center justify-center border border-[rgba(0,245,255,0.15)] bg-[#070d1a]/80 text-slate-400 hover:text-white hover:border-[rgba(0,245,255,0.4)] hover:shadow-[0_0_15px_rgba(0,245,255,0.15)] transition-all duration-200">
                                        <FaGithub size={18} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/riadh-benlamine/" target="_blank" rel="noopener noreferrer"
                                       className="w-10 h-10 flex items-center justify-center border border-[rgba(0,245,255,0.15)] bg-[#070d1a]/80 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(0,245,255,0.15)] transition-all duration-200">
                                        <FaLinkedin size={18} />
                                    </a>
                                </div>
                            </div>

                            {/* Quick stats */}
                            <div className="flex gap-8 pt-2 border-t border-[rgba(0,245,255,0.08)]">
                                {[
                                    { num: "1", label: "CVE" },
                                    { num: "4+", label: "Exploits" },
                                    { num: "3+", label: "Bug Bounties" },
                                    { num: "1.5+", label: "Years Exp." },
                                ].map((s, i) => (
                                    <div key={i} className="pt-4">
                                        <div className="font-['Oxanium',monospace] text-xl font-extrabold text-cyan-400"
                                             style={{ textShadow: "0 0 15px rgba(0,245,255,0.4)" }}>
                                            {s.num}
                                        </div>
                                        <div className="font-['Oxanium',monospace] text-[0.6rem] tracking-[2px] uppercase text-slate-500 mt-0.5">
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT: VISUAL ── */}
                        <HeroVisual isLoaded={isLoaded} />
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                    <span className="font-['Oxanium',monospace] text-[0.58rem] tracking-[3px] uppercase text-slate-600">Scroll</span>
                    <div className="w-px h-10 bg-gradient-to-b from-cyan-400/50 to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
                </div>
            </section>

            {/* ── CYBER DIVIDER ── */}
            <div className="relative bg-[#040810] z-10 py-2">
                <div className="flex items-center gap-4 px-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(0,245,255,0.2)] to-transparent" />
                    <span className="font-['Oxanium',monospace] text-[0.55rem] tracking-[4px] text-slate-700 uppercase whitespace-nowrap">
            ◈ &nbsp; Portfolio &nbsp; ◈
          </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(0,245,255,0.2)] to-transparent" />
                </div>
            </div>

            {/* ── EXPERIENCE ── */}
            <div id="experience" className="bg-[#040810]">
                <Experience />
            </div>

            {/* ── SKILLS ── */}
            <div id="skills" className="bg-[#040810]">
                <Skills />
            </div>

            {/* ── PROJECTS ── */}
            <div id="projects" className="bg-[#040810]">
                <Projects />
            </div>
        </>
    );
}