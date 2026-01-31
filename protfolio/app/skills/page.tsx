// components/Skills.tsx
'use client';

import { Card, CardBody, Progress, Chip } from "@heroui/react";
import { Shield, Code, Database, Globe, Lock, Terminal, Wifi, Server } from "lucide-react";

interface Skill {
    name: string;
    level: number;
    category: string;
    icon: any;
}

const skills: Skill[] = [
    { name: "Penetration Testing", level: 65, category: "Security", icon: Shield },
    { name: "Python/C++", level: 80, category: "Programming", icon: Code },
    { name: "Networking", level: 70, category: "Systems", icon: Wifi },
    { name: "Cryptography", level: 75, category: "Security", icon: Lock },
    { name: "Linux", level: 92, category: "Systems", icon: Terminal },
    { name: "Web Exploitation", level: 80, category: "Security", icon: Globe },
    { name: "Log analysis", level: 70, category: "Analysis", icon: Code },
    { name: "Windows Server 2022", level: 60, category: "Systems", icon: Server },
    { name: "Database management", level: 82, category: "Systems", icon: Database },
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

export default function Skills() {
    return (
        <section className="container mx-auto px-6 py-20">
            <div className="space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <Chip
                        color="primary"
                        variant="dot"
                        size="lg"
                    >
                        CAPABILITIES
                    </Chip>
                    <h2 className="text-4xl md:text-6xl font-bold">
                        Skills & <span className="text-primary">Expertise</span>
                    </h2>
                    <p className="text-lg text-default-500 max-w-2xl mx-auto">
                        Technologies and security tools I work with to find vulnerabilities and build secure systems
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;
                        const color = getSkillColor(skill.level);

                        return (
                            <Card
                                key={index}
                                className="border-none bg-background/60 dark:bg-default-100/50 hover:scale-105 transition-transform duration-300"
                            >
                                <CardBody className="p-6 gap-4">

                                    {/* Icon & Title */}
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">
                                                {skill.name}
                                            </h3>
                                            <p className="text-xs text-default-500">
                                                {skill.category}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Level Badge */}
                                    <div>
                                        <Chip
                                            color={color}
                                            variant="flat"
                                            size="sm"
                                        >
                                            {getSkillLabel(skill.level)}
                                        </Chip>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm text-default-500">
                                            <span>Proficiency</span>
                                            <span className="text-primary font-semibold">{skill.level}%</span>
                                        </div>
                                        <Progress
                                            size="md"
                                            value={skill.level}
                                            color={color}
                                            className="max-w-full"
                                        />
                                    </div>

                                </CardBody>
                            </Card>
                        );
                    })}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
                    <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg">
                        <div className="text-3xl md:text-4xl font-bold text-primary">
                            {skills.filter(s => s.level >= 85).length}
                        </div>
                        <div className="text-sm text-default-500 mt-2">Expert Skills</div>
                    </div>

                    <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg">
                        <div className="text-3xl md:text-4xl font-bold text-primary">
                            {skills.filter(s => s.level >= 70 && s.level < 85).length}
                        </div>
                        <div className="text-sm text-default-500 mt-2">Advanced</div>
                    </div>

                    <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg">
                        <div className="text-3xl md:text-4xl font-bold text-primary">
                            {skills.length}
                        </div>
                        <div className="text-sm text-default-500 mt-2">Total Skills</div>
                    </div>

                    <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg">
                        <div className="text-3xl md:text-4xl font-bold text-primary">
                            {Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length)}%
                        </div>
                        <div className="text-sm text-default-500 mt-2">Avg Level</div>
                    </div>
                </div>

            </div>
        </section>
    );
}