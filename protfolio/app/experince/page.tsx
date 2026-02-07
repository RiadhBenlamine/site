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
    company: "Self employed ",
    location: "Blida, Algeria",
    period: "2019 - 2020",
    description: [
      "Provided technical support for 20+ Windows-based computers",
      "Installed, configured, and maintained Windows 10 systems and software",
      "Performed system reinstallation, driver configuration, and malware removal",
      "Diagnosed and resolved hardware, software, and network connectivity issues",
    ],
    tags: ["IT support", "IT system management"],
    type: "work",
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
              1.5+
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
