"use client";
import { Navbar as Nv, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@heroui/react";
import { useState } from "react";
import { Terminal, Briefcase, Code, FolderGit2, Mail, Book } from "lucide-react";

export const RbnLogo = () => {
    return (
        <Link href="/" className="font-mono text-white text-xl md:text-2xl leading-relaxed group cursor-pointer">
            <div className="flex items-center gap-1">
                <span className="text-primary">[</span>
                <span className="text-white group-hover:text-primary transition-colors">rbn0x00</span>
                <span className="text-primary font-bold">@</span>
                <span className="text-white group-hover:text-primary transition-colors">portfolio</span>
                <span className="text-primary">]</span>
                <span className="text-default-500 ml-1">
          $<span className="animate-pulse ml-1">_</span>
        </span>
            </div>
        </Link>
    );
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Experience", href: "#experience", icon: Briefcase },
        { name: "Skills", href: "#skills", icon: Code },
        { name: "Projects", href: "#projects", icon: FolderGit2 },
        {name : "Blogs", href: "/blog", icon: Book },
        { name: "Contact", href: "/contact", icon: Mail },
    ];

    return (
        <Nv
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-transparent backdrop-blur-md"
            maxWidth="xl"
            isBordered
        >
            {/* Mobile Menu Toggle */}
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <RbnLogo />
                </NavbarBrand>
            </NavbarContent>

            {/* Desktop Menu */}
            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavbarItem key={link.href}>
                            <Link
                                href={link.href}
                                className="flex items-center gap-2 text-default-500 hover:text-primary transition-colors font-medium"
                            >
                                <Icon className="w-4 h-4" />
                                {link.name}
                            </Link>
                        </NavbarItem>
                    );
                })}
            </NavbarContent>

            {/* Right side - CTA */}
            <NavbarContent justify="end">
                <NavbarItem className="hidden md:flex">
                    <Button
                        as={Link}
                        href="#contact"
                        color="primary"
                        variant="flat"
                        size="sm"
                        radius="lg"
                    >
                        Get In Touch
                    </Button>
                </NavbarItem>
            </NavbarContent>

            {/* Mobile Menu */}
            <NavbarMenu className="pt-6 gap-2">
                {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <NavbarMenuItem key={`${link.href}-${index}`}>
                            <Link
                                className="w-full"
                                href={link.href}
                                size="lg"
                                onPress={() => setIsMenuOpen(false)}
                            >
                                <div className="flex items-center gap-3 text-default-500 hover:text-primary transition-colors">
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{link.name}</span>
                                </div>
                            </Link>
                        </NavbarMenuItem>
                    );
                })}

                {/* Mobile CTA */}
                <NavbarMenuItem>
                    <Button
                        as={Link}
                        href="#contact"
                        color="primary"
                        variant="flat"
                        size="lg"
                        radius="lg"
                        className="w-full mt-4"
                        onPress={() => setIsMenuOpen(false)}
                    >
                        Get In Touch
                    </Button>
                </NavbarMenuItem>
            </NavbarMenu>
        </Nv>
    );
}