"use client";
import { Navbar as Nv, NavbarBrand, NavbarContent, Link } from "@heroui/react";

export const RbnLogo = () => {
  return <h1 className="text-5xl text-blue-500 font-bold">RBN0x00</h1>;
};

export default function Navbar() {
  const navLinks = [
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <Nv>
      <NavbarBrand>
        <RbnLogo />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.name}
          </Link>
        ))}
      </NavbarContent>
    </Nv>
  );
}
