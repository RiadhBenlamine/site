// app/contact/page.tsx
"use client";

import { Card, CardBody, Button, Input, Textarea, Chip } from "@heroui/react";
import { Mail, MapPin, Github, Linkedin, Twitter, Send, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaMedium } from "react-icons/fa";

import {sendContactEmail} from "@/app/contact/actions";

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

const cardHoverVariants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
};

const socialLinks = [
    {
        name: "GitHub",
        icon: FaGithub,
        href: "https://github.com/RiadhBenlamine",
        color: "hover:text-gray-300",
        bgColor: "bg-gray-800/20",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        href: "https://www.linkedin.com/in/riadh-benlamine/",
        color: "hover:text-blue-500",
        bgColor: "bg-blue-500/20",
    },
    {
        name: "Twitter",
        icon: FaTwitter,
        href: "https://twitter.com/yourusername",
        color: "hover:text-sky-400",
        bgColor: "bg-sky-400/20",
    },
    {
        name: "Medium",
        icon: FaMedium,
        href: "https://medium.com/@rbn0x00",
        color: "hover:text-green-400",
        bgColor: "bg-green-400/20",
    },
];

const contactInfo = [
    {
        icon: Mail,
        title: "Email",
        value: "benlamineriadh@gmail.com",
        href: "mailto:benlamineriadh@gmail.com",
    },
    {
        icon: MapPin,
        title: "Location",
        value: "Blida, Algeria",
        href: "#",
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await sendContactEmail(formData);

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: "", email: "", subject: "", message: "" });
            setIsSubmitted(false);
        }, 3000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="container mx-auto px-6 py-20 relative overflow-hidden min-h-screen">
            {/* Animated background particles */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-40 right-20 w-1 h-1 bg-primary rounded-full"
                    animate={{
                        scale: [1, 2, 1],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />
                <motion.div
                    className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-primary rounded-full"
                    animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </div>

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
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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
                <motion.div className="text-center space-y-4" variants={itemVariants}>
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
                            GET IN TOUCH
                        </Chip>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-6xl font-bold"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Let&apos;s <span className="text-primary">Connect</span>
                    </motion.h2>

                    <motion.p
                        className="text-lg text-default-500 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        Have a question or want to work together? Feel free to reach out!
                    </motion.p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Left Side - Contact Info & Social */}
                    <motion.div
                        className="lg:col-span-1 space-y-6"
                        variants={itemVariants}
                    >
                        {/* Contact Info Cards */}
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={cardHoverVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Card className="border-none bg-background/60 dark:bg-default-100/50">
                                        <CardBody className="p-6">
                                            <div className="flex items-center gap-4">
                                                <motion.div
                                                    className="p-3 bg-primary/10 rounded-lg"
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <Icon className="w-6 h-6 text-primary" />
                                                </motion.div>
                                                <div>
                                                    <p className="text-sm text-default-500">
                                                        {info.title}
                                                    </p>
                                                    <p className="font-semibold">{info.value}</p>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            );
                        })}

                        {/* Social Links */}
                        <motion.div variants={itemVariants}>
                            <Card className="border-none bg-background/60 dark:bg-default-100/50">
                                <CardBody className="p-6">
                                    <h3 className="font-bold mb-4">Follow Me</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {socialLinks.map((social, index) => {
                                            const Icon = social.icon;
                                            return (
                                                <motion.a
                                                    key={index}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center gap-2 p-3 rounded-lg ${social.bgColor} ${social.color} transition-colors`}
                                                    whileHover={{ scale: 1.1, y: -2 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Icon size={20} />
                                                    <span className="text-sm font-medium">
                            {social.name}
                          </span>
                                                </motion.a>
                                            );
                                        })}
                                    </div>
                                </CardBody>
                            </Card>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        className="lg:col-span-2"
                        variants={itemVariants}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Card className="border-none bg-background/60 dark:bg-default-100/50">
                                <CardBody className="p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <Input
                                                label="Name"
                                                placeholder="Enter your name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                size="lg"
                                                classNames={{
                                                    input: "text-base",
                                                    inputWrapper: "bg-default-100/50",
                                                }}
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <Input
                                                type="email"
                                                label="Email"
                                                placeholder="Enter your email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                size="lg"
                                                classNames={{
                                                    input: "text-base",
                                                    inputWrapper: "bg-default-100/50",
                                                }}
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 }}
                                        >
                                            <Input
                                                label="Subject"
                                                placeholder="What's this about?"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                size="lg"
                                                classNames={{
                                                    input: "text-base",
                                                    inputWrapper: "bg-default-100/50",
                                                }}
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            <Textarea
                                                label="Message"
                                                placeholder="Your message..."
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                minRows={6}
                                                classNames={{
                                                    input: "text-base",
                                                    inputWrapper: "bg-default-100/50",
                                                }}
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.9 }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    size="lg"
                                                    className="w-full font-semibold"
                                                    isLoading={isSubmitting}
                                                    startContent={
                                                        isSubmitted ? (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ type: "spring", stiffness: 300 }}
                                                            >
                                                                <Check className="w-5 h-5" />
                                                            </motion.div>
                                                        ) : (
                                                            <Send className="w-5 h-5" />
                                                        )
                                                    }
                                                >
                                                    {isSubmitted
                                                        ? "Message Sent!"
                                                        : isSubmitting
                                                            ? "Sending..."
                                                            : "Send Message"}
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    </form>
                                </CardBody>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Fun Interactive Element */}
                <motion.div
                    className="text-center pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.p
                        className="text-default-500 text-sm"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        I usually respond within 24 hours ⚡
                    </motion.p>
                </motion.div>
            </motion.div>
        </section>
    );
}