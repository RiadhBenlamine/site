"use client";
import {Button, Image, Link} from "@heroui/react";
import { SpotlightEffect } from "@/components/spotlight";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import Skills from "./skills/page"
import Projects from "./projects/page"
import Experience from "./experince/page";


export default function Home() {
  return (
      <>
      <section className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* LEFT SIDE — TEXT */}
              <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      Hey,<span className="text-blue-500">I&apos;m Riadh 👋</span>
                      <span className="block text-primary text-3xl md:text-4xl">
                          <Typewriter
                              options={{
                                  strings: [
                                      "Cybersecurity Enthusiast",
                                      "CTF Player",
                                      "Security Researcher",
                                      "Penetration Tester",
                                  ],
                                  autoStart: true,  // starts typing automatically
                                  loop: true,       // rotates through all words infinitely
                                  deleteSpeed: 50,  // speed of deleting
                                  delay: 80,        // typing speed
                              }}
                          />
                      </span>
                  </h1>

                  <p className="text-lg text-default-500 max-w-xl">
                      I&apos;m a cybersecurity enthusiast and ethical hacker with hands-on experience solving CTF challenges, analyzing complex systems, and building practical security tools. I thrive on uncovering vulnerabilities, learning advanced techniques, and applying my skills to real-world security problems.
                  </p>

                  <div className="flex gap-4">
                      <Button color="primary" size="lg" radius="lg">
                          View Projects
                      </Button>
                      <Link href="https://github.com/RiadhBenlamine/" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={30} className="hover:text-gray-300 transition-colors" />
                      </Link>
                      <Link href="https://www.linkedin.com/in/riadh-benlamine/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={30} className="hover:text-blue-500 transition-colors" />
                      </Link>
                  </div>
              </div>

              {/* RIGHT SIDE — FLOATING IMAGE */}
              <div className="relative flex justify-center items-center">

                  {/* Glow background */}
                  <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl" />

                  <SpotlightEffect direction="both" color="blue" size="w-96 h-96"  />
                  <Image
                      alt="Hacker"
                      width={350}
                      src={"hacker.png"}
                      className="animate-float"
                  />
              </div>

          </div>
      </section>
          <Skills />
          <Projects />
          <Experience />
      </>
  )
}
