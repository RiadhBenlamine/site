// app/research/page.tsx
"use client";

import { Card, CardBody, CardFooter, Chip, Button, Link, Tabs, Tab } from "@heroui/react";
import {  Bug, FileCode, ExternalLink, Award, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

interface CVE {
    id: string;
    title: string;
    description: string;
    severity: "Critical" | "High" | "Medium" | "Low";
    cvss: number;
    date: string;
    vendor: string;
    status: "Published" | "Under Review" | "Patched";
    cveLink?: string;
    details: string[];
}

interface Exploit {
    id: string;
    title: string;
    edbId: string;
    platform: string;
    type: string;
    date: string;
    author: string;
    verified: boolean;
    edbLink: string;
    description: string;
}

interface BugBounty {
    id: string;
    program: string;
    vulnerability: string;
    severity: "Critical" | "High" | "Medium" | "Low";
    bounty: string;
    date: string;
    status: "Resolved" | "Triaged" | "Pending";
    description: string;
}

const cves: CVE[] = [
    {
        id: "CVE-2025-26186",
        title: "SQL injection vulnerability in OpenSIS ",
        description: "Unauthenticated remote code execution vulnerability in Opensis software",
        severity: "Critical",
        cvss: 8.1,
        date: "2025-07-15",
        vendor: "OS4ED",
        status: "Patched",
        cveLink: "https://nvd.nist.gov/vuln/detail/CVE-2025-26186",
        details: [
            "Allows unauthenticated attackers to execute arbitrary code exploiting SQL injection",
            "Affects all versions",
            "CVE assigned with CVSS score of 8.1"
        ]
    },
];

const exploits: Exploit[] = [
    {
        id: "1",
        title: "Student Result Management System 1.0 - SQL Injection",
        edbId: "EDB-49974",
        platform: "Web Applications",
        type: "SQL injection",
        date: "2021-06-10",
        verified: true,
        description: "POC for sql injection on SRMS 1.0",
        author: "Riadh Benlamine",
        edbLink: "https://www.exploit-db.com/exploits/49974"
    },
    {
        id: "2",
        title: "Stock Management System 1.0 - Blind SQL injection (Authenticated)",
        edbId: "EDB-49994",
        platform: "Web Application",
        type: "Blind Sql injection",
        date: "2021-06-14",
        verified: true,
        description: "PoC demonstrating blind sql injectoin through sanitized input in web application",
        author: "Riadh Benlamine",
        edbLink: "https://www.exploit-db.com/exploits/49994"
    },
    {
        id: "3",
        title: "Simple CRM 3.0 - Cross-Site Request Forgery (CSRF)",
        edbId: "EDB-50043",
        platform: "Web Application",
        type: "CSRF",
        date: "2021-06-21",
        verified: true,
        description: "CSRF exploit for vulnerable web application",
        author: "Riadh Benlamine",
        edbLink: "https://www.exploit-db.com/exploits/50043"
    },
    {
        id: "4",
        title: "Simple CRM 3.0 - Stored Cross site scripting (XSS)",
        edbId: "EDB-50044",
        platform: "Web Application",
        type: "XSS",
        date: "2021-06-21",
        verified: true,
        description: "Critical XSS vulnerability on web application",
        author: "Riadh Benlamine",
        edbLink: "https://www.exploit-db.com/exploits/50044"
    },
];

const bugBounties: BugBounty[] = [
    {
        id: "1",
        program: "Deutsch Telekom",
        vulnerability: "CSRF",
        severity: "Medium",
        bounty: "$0",
        date: "2020-09-10",
        status: "Resolved",
        description: "CSRF vulnerability",
    },
    {
        id: "2",
        program: "Deutsch Telekom",
        vulnerability: "Several Clickjacking vulnerabilities",
        severity: "Medium",
        bounty: "$100",
        date: "2021-05-25",
        status: "Resolved",
        description: "Multiple vulnerabilities found"
    },
    {
        id: "3",
        program: "Deutsch Telekom",
        vulnerability: "HTML/CSS injections",
        severity: "Low",
        bounty: "$0",
        date: "2021-09-15",
        status: "Resolved",
        description: "Vulnerable domain to HTML injection"
    },
];

const getSeverityColor = (severity: string) => {
    switch (severity) {
        case "Critical": return "danger";
        case "High": return "warning";
        case "Medium": return "primary";
        case "Low": return "success";
        default: return "default";
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "Patched":
        case "Resolved": return "success";
        case "Published":
        case "Triaged": return "warning";
        case "Under Review":
        case "Pending": return "primary";
        default: return "default";
    }
};

function CVECard({ cve, index }: { cve: CVE; index: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
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
    }, []);

    return (
        <motion.div
            ref={cardRef}
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            custom={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="border-none bg-background/60 dark:bg-default-100/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 h-full">
                <CardBody className="p-6 gap-4">
                    {/* Header with CVE ID and Severity */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="p-2 bg-danger/10 rounded-lg"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <AlertTriangle className="w-5 h-5 text-danger" />
                            </motion.div>
                            <div>
                                <h3 className="font-bold text-lg">{cve.id}</h3>
                                <p className="text-xs text-default-500">{cve.vendor}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Chip color={getSeverityColor(cve.severity)} variant="flat" size="sm">
                                {cve.severity}
                            </Chip>
                            <Chip color={getStatusColor(cve.status)} variant="dot" size="sm">
                                {cve.status}
                            </Chip>
                        </div>
                    </div>

                    {/* CVSS Score */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-default-500">CVSS Score:</span>
                        <span className="font-bold text-danger text-lg">{cve.cvss}</span>
                    </div>

                    {/* Title */}
                    <h4 className="font-semibold text-base">{cve.title}</h4>

                    {/* Description */}
                    <p className="text-sm text-default-500">{cve.description}</p>

                    {/* Details */}
                    <ul className="space-y-1">
                        {cve.details.map((detail, i) => (
                            <li key={i} className="text-xs text-default-500 flex gap-2">
                                <span className="text-primary">▹</span>
                                <span>{detail}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-default-500">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(cve.date).toLocaleDateString()}</span>
                    </div>
                </CardBody>

                {cve.cveLink && (
                    <CardFooter className="p-6 pt-0">
                        <Button
                            as={Link}
                            href={cve.cveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            variant="flat"
                            size="sm"
                            startContent={<ExternalLink className="w-4 h-4" />}
                            className="w-full"
                        >
                            View CVE Details
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </motion.div>
    );
}

function ExploitCard({ exploit, index }: { exploit: Exploit; index: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
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
    }, []);

    return (
        <motion.div
            ref={cardRef}
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            custom={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="border-none bg-background/60 dark:bg-default-100/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 h-full">
                <CardBody className="p-6 gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="p-2 bg-success/10 rounded-lg"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <FileCode className="w-5 h-5 text-success" />
                            </motion.div>
                            <div>
                                <h3 className="font-bold text-sm">{exploit.edbId}</h3>
                                <p className="text-xs text-default-500">{exploit.platform}</p>
                            </div>
                        </div>
                        {exploit.verified && (
                            <Chip color="success" variant="flat" size="sm" startContent={<CheckCircle className="w-3 h-3" />}>
                                Verified
                            </Chip>
                        )}
                    </div>

                    {/* Title */}
                    <h4 className="font-semibold text-base">{exploit.title}</h4>

                    {/* Description */}
                    <p className="text-sm text-default-500">{exploit.description}</p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-2">
                        <Chip size="sm" variant="bordered">{exploit.type}</Chip>
                        <Chip size="sm" variant="bordered">{exploit.platform}</Chip>
                    </div>

                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-xs text-default-500">
                        <span>By {exploit.author}</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(exploit.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </CardBody>

                <CardFooter className="p-6 pt-0">
                    <Button
                        as={Link}
                        href={exploit.edbLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        variant="flat"
                        size="sm"
                        startContent={<ExternalLink className="w-4 h-4" />}
                        className="w-full"
                    >
                        View on Exploit-DB
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

function BugBountyCard({ bounty, index }: { bounty: BugBounty; index: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
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
    }, []);

    return (
        <motion.div
            ref={cardRef}
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            custom={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="border-none bg-background/60 dark:bg-default-100/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 h-full">
                <CardBody className="p-6 gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="p-2 bg-warning/10 rounded-lg"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Award className="w-5 h-5 text-warning" />
                            </motion.div>
                            <div>
                                <h3 className="font-bold text-base">{bounty.program}</h3>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Chip color={getSeverityColor(bounty.severity)} variant="flat" size="sm">
                                {bounty.severity}
                            </Chip>
                            <Chip color={getStatusColor(bounty.status)} variant="dot" size="sm">
                                {bounty.status}
                            </Chip>
                        </div>
                    </div>

                    {/* Bounty Amount */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-default-500">Bounty:</span>
                        <span className="font-bold text-success text-xl">{bounty.bounty}</span>
                    </div>

                    {/* Vulnerability Type */}
                    <h4 className="font-semibold text-base">{bounty.vulnerability}</h4>

                    {/* Description */}
                    <p className="text-sm text-default-500">{bounty.description}</p>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-default-500">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(bounty.date).toLocaleDateString()}</span>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    );
}

export default function Research() {
    const [selected, setSelected] = useState("cves");
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

    const totalCVEs = cves.length;
    const totalExploits = exploits.length;
    const totalBounties = bugBounties.length;
    const totalEarnings = bugBounties.reduce((sum, b) => sum + parseInt(b.bounty.replace(/[$,]/g, "")), 0);

    return (
        <section className="container mx-auto px-6 py-20 relative overflow-hidden min-h-screen">
            {/* Animated background gradient */}
            <motion.div
                className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-danger/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            <motion.div
                className="space-y-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    className={`text-center space-y-4 transition-all duration-1000 ${
                        headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                    }`}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1,
                        }}
                    >
                        <Chip color="primary" variant="dot" size="lg">
                            SECURITY RESEARCH
                        </Chip>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-6xl font-bold"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Research & <span className="text-primary">Discoveries</span>
                    </motion.h2>

                    <motion.p
                        className="text-lg text-default-500 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        CVE discoveries, public exploits, and bug bounty achievements
                    </motion.p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                    variants={itemVariants}
                >
                    <motion.div
                        className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="text-3xl md:text-4xl font-bold text-danger"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                        >
                            {totalCVEs}
                        </motion.div>
                        <div className="text-sm text-default-500 mt-2">CVEs Published</div>
                    </motion.div>

                    <motion.div
                        className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="text-3xl md:text-4xl font-bold text-success"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
                        >
                            {totalExploits}
                        </motion.div>
                        <div className="text-sm text-default-500 mt-2">Exploits Published</div>
                    </motion.div>

                    <motion.div
                        className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="text-3xl md:text-4xl font-bold text-warning"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
                        >
                            {totalBounties}
                        </motion.div>
                        <div className="text-sm text-default-500 mt-2">Bug Bounties</div>
                    </motion.div>

                    <motion.div
                        className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="text-2xl md:text-3xl font-bold text-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.9 }}
                        >
                            ${totalEarnings.toLocaleString()}
                        </motion.div>
                        <div className="text-sm text-default-500 mt-2">Total Earnings</div>
                    </motion.div>
                </motion.div>

                {/* Tabs */}
                <motion.div variants={itemVariants}>
                    <Tabs
                        selectedKey={selected}
                        onSelectionChange={(key) => setSelected(key as string)}
                        color="primary"
                        size="lg"
                        className="flex justify-center"
                    >
                        <Tab
                            key="cves"
                            title={
                                <div className="flex items-center gap-2">
                                    <Bug className="w-4 h-4" />
                                    <span>CVEs</span>
                                </div>
                            }
                        />
                        <Tab
                            key="exploits"
                            title={
                                <div className="flex items-center gap-2">
                                    <FileCode className="w-4 h-4" />
                                    <span>Exploits</span>
                                </div>
                            }
                        />
                        <Tab
                            key="bounties"
                            title={
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4" />
                                    <span>Bug Bounties</span>
                                </div>
                            }
                        />
                    </Tabs>
                </motion.div>

                {/* Content */}
                <motion.div
                    key={selected}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {selected === "cves" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cves.map((cve, index) => (
                                <CVECard key={cve.id} cve={cve} index={index} />
                            ))}
                        </div>
                    )}

                    {selected === "exploits" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {exploits.map((exploit, index) => (
                                <ExploitCard key={exploit.id} exploit={exploit} index={index} />
                            ))}
                        </div>
                    )}

                    {selected === "bounties" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bugBounties.map((bounty, index) => (
                                <BugBountyCard key={bounty.id} bounty={bounty} index={index} />
                            ))}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
}