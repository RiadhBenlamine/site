// app/page.tsx
"use client";
import { Button, Image, Link } from "@heroui/react";
import { SpotlightEffect } from "@/components/spotlight";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import Skills from "./skills/page";
import Projects from "./projects/page";
import Experience from "@/app/experience/page";
import { useState, useEffect } from "react";

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <>
            {/* Hero/Landing Section */}
            <section id="home" className="container mx-auto px-6 py-20 relative overflow-hidden">
                {/* Animated background particles */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping" />
                    <div className="absolute top-40 right-20 w-1 h-1 bg-primary rounded-full animate-ping delay-300" />
                    <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-ping delay-700" />
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* LEFT SIDE — TEXT */}
                    <div
                        className={`space-y-6 transition-all duration-1000 ${
                            isLoaded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                        }`}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Hey <span className="text-blue-500">I&apos;m Riadh 👋</span>
                            <span className="block text-primary text-3xl md:text-4xl">
                <Typewriter
                    options={{
                        strings: [
                            "Cybersecurity Enthusiast",
                            "CTF Player",
                            "Security Researcher",
                            "Penetration Tester",
                        ],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 50,
                        delay: 80,
                    }}
                />
              </span>
                        </h1>

                        <p className="text-lg text-default-500 max-w-xl">
                            I&apos;m a cybersecurity enthusiast and ethical hacker with
                            hands-on experience solving CTF challenges, analyzing complex
                            systems, and building practical security tools. I thrive on
                            uncovering vulnerabilities, learning advanced techniques, and
                            applying my skills to real-world security problems.
                        </p>

                        <div className="flex gap-4 items-center">
                            <Button
                                as={Link}
                                href="#projects"
                                color="primary"
                                size="lg"
                                radius="lg"
                                className="hover:scale-105 transition-transform"
                            >
                                View Projects
                            </Button>
                            <Link
                                href="https://github.com/RiadhBenlamine/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <FaGithub
                                    size={30}
                                    className="hover:text-gray-300 transition-colors"
                                />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/riadh-benlamine/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <FaLinkedin
                                    size={30}
                                    className="hover:text-blue-500 transition-colors"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT SIDE — FLOATING IMAGE */}
                    <div
                        className={`relative flex justify-center items-center transition-all duration-1000 delay-300 ${
                            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                        }`}
                    >
                        {/* Glow background */}
                        <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />

                        <SpotlightEffect direction="both" color="blue" size="w-96 h-96" />
                        <Image
                            alt="Hacker"
                            width={350}
                            src="hacker.png"
                            className="animate-float relative z-10"
                        />
                    </div>
                </div>
            </section>

            {/* Sections with IDs for smooth scrolling */}
            <div id="experience">
                <Experience />
            </div>

            <div id="skills">
                <Skills />
            </div>

            <div id="projects">
                <Projects />
            </div>
        </>
    );
}