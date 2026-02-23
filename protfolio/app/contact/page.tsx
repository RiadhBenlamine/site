// app/contact/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {Mail, MapPin, Send, CheckCircle} from "lucide-react";
import { sendContactEmail } from "./actions";

const socialLinks = [
    {
        icon: FaGithub,
        label: "GitHub",
        value: "github.com/RiadhBenlamine",
        href: "https://github.com/RiadhBenlamine",
    },
    {
        icon: FaLinkedin,
        label: "Linkedin",
        value: "linkedin.com/",
        href: "/",
    },
    {
        icon: Mail,
        label: "Email",
        value: "benlamineriadh@gmail.com",
        href: "mailto:benlamineriadh@gmail.com",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Algeria",
        href: null,
    },
];

export default function Contact() {
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState({
        name: "", email: "", subject: "", message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
            { threshold: 0.1 }
        );
        if (headerRef.current) observer.observe(headerRef.current);
        return () => { if (headerRef.current) observer.unobserve(headerRef.current); };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            await sendContactEmail(formState);
            setStatus("sent");
            setFormState({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setStatus("idle"), 4000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

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
                        ◈ GET IN TOUCH
                    </div>
                    <h2 className="font-['Oxanium',monospace] text-4xl md:text-6xl font-extrabold text-white mb-4">
                        Contact{" "}
                        <span className="text-cyan-400" style={{ textShadow: "0 0 30px rgba(0,245,255,0.5)" }}>
              Me
            </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Have a project, a bug bounty collab, or want to discuss security research? Let's talk.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Left: info */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="font-['Oxanium',monospace] text-xl font-bold text-white mb-3">
                                Let's work together
                            </h3>
                            <p className="text-slate-400 leading-relaxed font-light text-sm">
                                I'm always open to discussing penetration testing engagements, security research collaborations,
                                or just talking about offensive security techniques and tooling.
                            </p>
                        </div>

                        {/* Status indicator */}
                        <div className="flex items-center gap-3 p-4 bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)]">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(57,255,20,0.8)] animate-pulse flex-shrink-0" />
                            <div>
                                <div className="font-['Oxanium',monospace] text-green-400 text-sm font-semibold">Available for freelance</div>
                                <div className="font-['Oxanium',monospace] text-[0.6rem] tracking-[2px] text-slate-500 uppercase mt-0.5">Status</div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col gap-3">
                            {socialLinks.map((link, i) => {
                                const Icon = link.icon;
                                const inner = (
                                    <div key={i}
                                         className={`flex items-center gap-3 p-4 bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)]
                      ${link.href ? "hover:border-[rgba(0,245,255,0.35)] hover:bg-cyan-400/5 hover:translate-x-1 cursor-pointer" : "cursor-default"}
                      transition-all duration-200`}
                                    >
                                        <div className="w-9 h-9 bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-4 h-4 text-cyan-400" />
                                        </div>
                                        <div>
                                            <div className="font-['Oxanium',monospace] text-white text-sm">{link.value}</div>
                                            <div className="font-['Oxanium',monospace] text-[0.6rem] tracking-[2px] uppercase text-slate-500 mt-0.5">{link.label}</div>
                                        </div>
                                    </div>
                                );
                                return link.href ? (
                                    <a href={link.href} target="_blank" rel="noopener noreferrer" key={i}>{inner}</a>
                                ) : (
                                    <div key={i}>{inner}</div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="relative bg-[#070d1a]/80 border border-[rgba(0,245,255,0.12)] backdrop-blur-md p-8">
                        {/* Corner brackets */}
                        <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                        <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-['Oxanium',monospace] text-[0.6rem] tracking-[2px] uppercase text-slate-500">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                                        placeholder="John Doe"
                                        className="bg-[#040810] border border-[rgba(0,245,255,0.15)] text-slate-200 placeholder-slate-600
                      px-4 py-3 text-sm font-['Rajdhani',sans-serif] outline-none
                      focus:border-cyan-400/50 focus:shadow-[0_0_12px_rgba(0,245,255,0.08)] transition-all duration-200"
                                    />
                                </div>
                                {/* Email */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-['Oxanium',monospace] text-[0.6rem] tracking-[2px] uppercase text-slate-500">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                                        placeholder="you@example.com"
                                        className="bg-[#040810] border border-[rgba(0,245,255,0.15)] text-slate-200 placeholder-slate-600
                      px-4 py-3 text-sm font-['Rajdhani',sans-serif] outline-none
                      focus:border-cyan-400/50 focus:shadow-[0_0_12px_rgba(0,245,255,0.08)] transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-['Oxanium',monospace] text-[0.6rem] tracking-[2px] uppercase text-slate-500">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formState.subject}
                                    onChange={(e) => setFormState((p) => ({ ...p, subject: e.target.value }))}
                                    placeholder="Penetration testing inquiry"
                                    className="bg-[#040810] border border-[rgba(0,245,255,0.15)] text-slate-200 placeholder-slate-600
                    px-4 py-3 text-sm font-['Rajdhani',sans-serif] outline-none
                    focus:border-cyan-400/50 focus:shadow-[0_0_12px_rgba(0,245,255,0.08)] transition-all duration-200"
                                />
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-['Oxanium',monospace] text-[0.6rem] tracking-[2px] uppercase text-slate-500">
                                    Message
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formState.message}
                                    onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                                    placeholder="Tell me about your project or inquiry..."
                                    className="bg-[#040810] border border-[rgba(0,245,255,0.15)] text-slate-200 placeholder-slate-600
                    px-4 py-3 text-sm font-['Rajdhani',sans-serif] outline-none resize-y
                    focus:border-cyan-400/50 focus:shadow-[0_0_12px_rgba(0,245,255,0.08)] transition-all duration-200"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status === "sending" || status === "sent"}
                                className={`w-full flex items-center justify-center gap-3 font-['Oxanium',monospace] text-[0.75rem] font-bold tracking-[3px] uppercase py-3.5 transition-all duration-300
                  ${status === "sent"
                                    ? "bg-green-400 text-[#040810] shadow-[0_0_30px_rgba(57,255,20,0.4)]"
                                    : status === "error"
                                        ? "bg-pink-500 text-white"
                                        : status === "sending"
                                            ? "bg-cyan-400/50 text-[#040810] cursor-wait"
                                            : "bg-cyan-400 text-[#040810] hover:bg-white hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]"
                                }`}
                                style={{ clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}
                            >
                                {status === "sending" && (
                                    <div className="w-4 h-4 border-2 border-[#040810]/40 border-t-[#040810] rounded-full animate-spin" />
                                )}
                                {status === "sent" && <CheckCircle className="w-4 h-4" />}
                                {status === "idle" && <Send className="w-4 h-4" />}
                                {status === "idle" && "Send Message"}
                                {status === "sending" && "Transmitting…"}
                                {status === "sent" && "Message Sent!"}
                                {status === "error" && "Transmission Failed — Retry"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}