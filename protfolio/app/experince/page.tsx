// components/Experience.tsx
"use client";

import { Card, CardBody, Chip } from "@heroui/react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
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
    title: "Security Researcher",
    company: "CyberSec Labs",
    location: "Remote",
    period: "2024 - Present",
    description: [
      "Conducted penetration testing on web applications and identified critical vulnerabilities",
      "Developed custom exploitation tools using Python and Bash",
      "Participated in bug bounty programs and reported security flaws to major companies",
      "Created comprehensive security reports and remediation recommendations",
    ],
    tags: ["Penetration Testing", "Bug Bounty", "Python"],
    type: "work",
  },
  {
    title: "CTF Team Member",
    company: "HackTheBox University",
    location: "Online",
    period: "2023 - Present",
    description: [
      "Competed in national and international CTF competitions",
      "Solved 200+ challenges across web exploitation, cryptography, and reverse engineering",
      "Ranked in top 5% on HackTheBox platform",
      "Mentored junior members on exploitation techniques",
    ],
    tags: ["CTF", "Web Exploitation", "Reverse Engineering"],
    type: "work",
  },
  {
    title: "Bachelor's in Computer Science",
    company: "University of Technology",
    location: "Algeria",
    period: "2021 - 2024",
    description: [
      "Specialized in cybersecurity and network security",
      "Graduated with honors (GPA: 3.8/4.0)",
      "Led university cybersecurity club with 50+ members",
      "Published research paper on machine learning in intrusion detection",
    ],
    tags: ["Computer Science", "Cybersecurity", "Research"],
    type: "education",
  },
  {
    title: "Offensive Security Certified Professional (OSCP)",
    company: "Offensive Security",
    location: "Online",
    period: "2023",
    description: [
      "Completed 90-day intensive penetration testing course",
      "Passed 24-hour hands-on certification exam",
      "Compromised 30+ machines in lab environment",
      "Mastered privilege escalation and post-exploitation techniques",
    ],
    tags: ["OSCP", "Penetration Testing", "Certification"],
    type: "certification",
  },
  {
    title: "Junior Penetration Tester",
    company: "SecureNet Solutions",
    location: "Algiers, Algeria",
    period: "2022 - 2023",
    description: [
      "Performed vulnerability assessments for 15+ corporate clients",
      "Conducted social engineering campaigns and phishing simulations",
      "Automated security scanning processes using Python scripts",
      "Collaborated with development teams to implement security best practices",
    ],
    tags: ["Vulnerability Assessment", "Social Engineering", "Python"],
    type: "work",
  },
  {
    title: "Certified Ethical Hacker (CEH)",
    company: "EC-Council",
    location: "Online",
    period: "2022",
    description: [
      "Learned advanced hacking techniques and countermeasures",
      "Studied network scanning, enumeration, and system hacking",
      "Gained knowledge in malware analysis and IoT security",
      "Completed hands-on labs in virtual environment",
    ],
    tags: ["CEH", "Ethical Hacking", "Certification"],
    type: "certification",
  },
];

function ExperienceCard({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "primary";
      case "education":
        return "success";
      case "certification":
        return "warning";
      default:
        return "default";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "work":
        return "Work Experience";
      case "education":
        return "Education";
      case "certification":
        return "Certification";
      default:
        return "Experience";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`flex gap-6 transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : index % 2 === 0
            ? "opacity-0 -translate-x-20"
            : "opacity-0 translate-x-20"
      }`}
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full ${
            experience.type === "work"
              ? "bg-primary"
              : experience.type === "education"
                ? "bg-success"
                : "bg-warning"
          } ring-4 ring-background z-10`}
        />
        <div className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent" />
      </div>

      {/* Content Card */}
      <Card className="flex-1 mb-8 border-none bg-background/60 dark:bg-default-100/50 hover:scale-[1.02] transition-transform duration-300">
        <CardBody className="p-6 gap-4">
          {/* Type Badge */}
          <Chip color={getTypeColor(experience.type)} variant="flat" size="sm">
            {getTypeLabel(experience.type)}
          </Chip>

          {/* Title & Company */}
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">{experience.title}</h3>
            <p className="text-lg text-primary font-semibold">
              {experience.company}
            </p>
          </div>

          {/* Location & Period */}
          <div className="flex flex-wrap gap-4 text-sm text-default-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {experience.period}
            </div>
          </div>

          {/* Description */}
          <ul className="space-y-2">
            {experience.description.map((item, i) => (
              <li key={i} className="text-default-500 flex gap-2">
                <span className="text-primary mt-1.5">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {experience.tags.map((tag, i) => (
              <Chip
                key={i}
                size="sm"
                variant="bordered"
                className="border-primary/30"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Chip color="primary" variant="dot" size="lg">
            MY JOURNEY
          </Chip>
          <h2 className="text-4xl md:text-6xl font-bold">
            Experience & <span className="text-primary">Education</span>
          </h2>
          <p className="text-lg text-default-500 max-w-2xl mx-auto">
            My professional journey in cybersecurity, from learning the
            fundamentals to hunting vulnerabilities
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto pt-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
          <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {experiences.filter((e) => e.type === "work").length}
            </div>
            <div className="text-sm text-default-500 mt-2">
              Work Experiences
            </div>
          </div>

          <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg">
            <div className="text-3xl md:text-4xl font-bold text-success">
              {experiences.filter((e) => e.type === "education").length}
            </div>
            <div className="text-sm text-default-500 mt-2">Education</div>
          </div>

          <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg">
            <div className="text-3xl md:text-4xl font-bold text-warning">
              {experiences.filter((e) => e.type === "certification").length}
            </div>
            <div className="text-sm text-default-500 mt-2">Certifications</div>
          </div>

          <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              3+
            </div>
            <div className="text-sm text-default-500 mt-2">
              Years Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
