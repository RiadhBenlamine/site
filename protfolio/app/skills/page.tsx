// components/Skills.tsx
"use client";

import { Card, CardBody, Progress, Chip } from "@heroui/react";
import {
    Shield,
    Code,
    Database,
    Globe,
    Lock,
    Terminal,
    Wifi,
    Server,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Skill {
    name: string;
    level: number;
    category: string;
    icon: any;
}

const skills: Skill[] = [
    {
        name: "Penetration Testing",
        level: 65,
        category: "Security",
        icon: Shield,
    },
    { name: "Python/C++", level: 80, category: "Programming", icon: Code },
    { name: "Networking", level: 70, category: "Systems", icon: Wifi },
    { name: "Data security", level: 75, category: "Security", icon: Lock },
    { name: "Linux", level: 92, category: "Systems", icon: Terminal },
    { name: "Web Exploitation", level: 80, category: "Security", icon: Globe },
    { name: "Log analysis", level: 90, category: "Analysis", icon: Code },
    { name: "Windows Server 2022", level: 72, category: "Systems", icon: Server },
    {
        name: "Database management",
        level: 74,
        category: "Systems",
        icon: Database,
    },
];

const getSkillLabel = (level: number): string => {
    if (level >= 85) return "EXPERT";
    if (level >= 70) return "ADVANCED";
    if (level >= 50) return "INTERMEDIATE";
    return "LEARNING";
};

const getSkillColor = (level: number) => {
    if (level >= 85) return "success";
    if (level >= 70) return "warning";
    if (level >= 50) return "primary";
    return "danger";
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedLevel, setAnimatedLevel] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Animate progress bar
                    const timer = setTimeout(() => {
                        const interval = setInterval(() => {
                            setAnimatedLevel((prev) => {
                                if (prev >= skill.level) {
                                    clearInterval(interval);
                                    return skill.level;
                                }
                                return prev + 1;
                            });
                        }, 15);
                    }, index * 100); // Stagger animation

                    return () => clearTimeout(timer);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [skill.level, index]);

    const Icon = skill.icon;
    const color = getSkillColor(skill.level);

    return (
        <div
            ref={cardRef}
            className={`transition-all duration-700 ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
        >
            <Card className="border-none bg-background/60 dark:bg-default-100/50 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group">
                <CardBody className="p-6 gap-4">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300 group-hover:rotate-6 transform">
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                                {skill.name}
                            </h3>
                            <p className="text-xs text-default-500">{skill.category}</p>
                        </div>
                    </div>

                    {/* Level Badge */}
                    <div>
                        <Chip color={color} variant="flat" size="sm">
                            {getSkillLabel(skill.level)}
                        </Chip>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-default-500">
                            <span>Proficiency</span>
                            <span className="text-primary font-semibold">
                {animatedLevel}%
              </span>
                        </div>
                        <Progress
                            size="md"
                            value={animatedLevel}
                            color={color}
                            className="max-w-full"
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

function StatCard({
                      value,
                      label,
                      index,
                  }: {
    value: number | string;
    label: string;
    index: number;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedValue, setAnimatedValue] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Animate number counting
                    const numValue = typeof value === "string" ? parseInt(value) : value;
                    const timer = setTimeout(() => {
                        const interval = setInterval(() => {
                            setAnimatedValue((prev) => {
                                if (prev >= numValue) {
                                    clearInterval(interval);
                                    return numValue;
                                }
                                return prev + 1;
                            });
                        }, 50);
                    }, index * 100);

                    return () => clearTimeout(timer);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [value, index]);

    return (
        <div
            ref={cardRef}
            className={`text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="text-3xl md:text-4xl font-bold text-primary">
                {typeof value === "string" && value.includes("%")
                    ? `${animatedValue}%`
                    : animatedValue}
            </div>
            <div className="text-sm text-default-500 mt-2">{label}</div>
        </div>
    );
}

export default function Skills() {
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHeaderVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => {
            if (headerRef.current) {
                observer.unobserve(headerRef.current);
            }
        };
    }, []);

    return (
        <section className="container mx-auto px-6 py-20 relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="space-y-12">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`text-center space-y-4 transition-all duration-1000 ${
                        headerVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-10"
                    }`}
                >
                    <Chip color="primary" variant="dot" size="lg">
                        CAPABILITIES
                    </Chip>
                    <h2 className="text-4xl md:text-6xl font-bold">
                        Skills & <span className="text-primary">Expertise</span>
                    </h2>
                    <p className="text-lg text-default-500 max-w-2xl mx-auto">
                        Technologies and security tools I work with to find vulnerabilities
                        and build secure systems
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <SkillCard key={index} skill={skill} index={index} />
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
                    <StatCard
                        value={skills.filter((s) => s.level >= 85).length}
                        label="Expert Skills"
                        index={0}
                    />
                    <StatCard
                        value={skills.filter((s) => s.level >= 70 && s.level < 85).length}
                        label="Advanced"
                        index={1}
                    />
                    <StatCard value={skills.length} label="Total Skills" index={2} />
                    <StatCard
                        value={`${Math.round(
                            skills.reduce((a, b) => a + b.level, 0) / skills.length
                        )}%`}
                        label="Avg Level"
                        index={3}
                    />
                </div>
            </div>
        </section>
    );
}