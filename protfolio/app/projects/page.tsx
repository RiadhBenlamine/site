// components/Projects.tsx
'use client';

import { Card, CardBody, CardFooter, Button, Chip, Image, Link } from "@heroui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Shield, Code, Terminal, Globe, Lock, Bug } from "lucide-react";

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    github?: string;
    demo?: string;
    icon: any;
}

const projects: Project[] = [
    {
        title: "Network Scanner",
        description: "Advanced network reconnaissance tool with port scanning, service detection, and vulnerability assessment capabilities.",
        image: "/project1.jpg", // Replace with your image
        tags: ["Python", "Networking", "Nmap"],
        github: "https://github.com/RiadhBenlamine/network-scanner",
        demo: "https://demo.com",
        icon: Globe,
    },
    {
        title: "Password Cracker",
        description: "Multi-threaded password cracking tool supporting various hash algorithms including MD5, SHA256, and bcrypt.",
        image: "/project2.jpg",
        tags: ["Python", "Cryptography", "Hashcat"],
        github: "https://github.com/RiadhBenlamine/password-cracker",
        icon: Lock,
    },
    {
        title: "Web Vulnerability Scanner",
        description: "Automated web application security scanner detecting XSS, SQL injection, and other OWASP Top 10 vulnerabilities.",
        image: "/project3.jpg",
        tags: ["Python", "Web Security", "OWASP"],
        github: "https://github.com/RiadhBenlamine/web-scanner",
        demo: "https://demo.com",
        icon: Bug,
    },
    {
        title: "Exploit Development Framework",
        description: "Custom framework for developing and testing exploits with built-in shellcode generators and payload encoders.",
        image: "/project4.jpg",
        tags: ["Python", "Exploit Dev", "Assembly"],
        github: "https://github.com/RiadhBenlamine/exploit-framework",
        icon: Code,
    },
    {
        title: "Reverse Shell Tool",
        description: "Cross-platform reverse shell generator with encryption and anti-detection features for penetration testing.",
        image: "/project5.jpg",
        tags: ["Python", "C++", "Post-Exploitation"],
        github: "https://github.com/RiadhBenlamine/reverse-shell",
        icon: Terminal,
    },
    {
        title: "CTF Writeups Platform",
        description: "Personal blog and writeup platform documenting solutions to CTF challenges and security research findings.",
        image: "/project6.jpg",
        tags: ["Next.js", "CTF", "Documentation"],
        github: "https://github.com/RiadhBenlamine/ctf-writeups",
        demo: "https://writeups.com",
        icon: Shield,
    },
];

export default function Projects() {
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
        MY WORK
    </Chip>
    <h2 className="text-4xl md:text-6xl font-bold">
        Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-lg text-default-500 max-w-2xl mx-auto">
        Security tools, exploits, and research projects I've built to enhance penetration testing and vulnerability discovery
    </p>
    </div>

    {/* Projects Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
                const Icon = project.icon;

                return (
                    <Card
                        key={index}
                className="border-none bg-background/60 dark:bg-default-100/50 hover:scale-105 transition-transform duration-300"
                    >
                    {/* Project Image with Icon Overlay */}
                    <CardBody className="p-0 overflow-hidden">
                <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    {/* Replace this div with actual image when you have them */}
                    <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-20 h-20 text-primary/40" />
                    </div>
                {/* Uncomment when you have images */}
                {/* <Image
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      src={project.image}
                    /> */}
                </div>
                </CardBody>

                <CardBody className="p-6 gap-4">
                    {/* Title & Description */}
                    <div className="space-y-2">
                <h3 className="text-xl font-bold">
                    {project.title}
                    </h3>
                    <p className="text-sm text-default-500">
                    {project.description}
                    </p>
                    </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                            <Chip
                                key={i}
                        size="sm"
                        variant="flat"
                        color="primary"
                            >
                            {tag}
                            </Chip>
            ))}
                </div>
                </CardBody>

                {/* Footer with Links */}
                <CardFooter className="p-6 pt-0 gap-2">
                    {project.github && (
                            <Button
                                as={Link}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        variant="flat"
                        startContent={<FaGithub />}
                className="flex-1"
                    >
                    Code
                    </Button>
            )}
                {project.demo && (
                    <Button
                        as={Link}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    variant="bordered"
                    startContent={<FaExternalLinkAlt />}
                    className="flex-1"
                        >
                        Demo
                        </Button>
                )}
                </CardFooter>
                </Card>
            );
            })}
        </div>

    {/* CTA Section */}
    <div className="text-center pt-8">
    <p className="text-default-500 mb-4">
        Want to see more of my work?
        </p>
        <Button
        as={Link}
    href="https://github.com/RiadhBenlamine"
    target="_blank"
    rel="noopener noreferrer"
    color="primary"
    size="lg"
    radius="lg"
    startContent={<FaGithub size={20} />}
    >
    View All on GitHub
    </Button>
    </div>

    </div>
    </section>
);
}