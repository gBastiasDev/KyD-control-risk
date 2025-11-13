"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { servicesSection } from "@/constants/services";
import { aboutSection } from "@/constants/about";
import { contactSection, contactInfo } from "@/constants/contact";
import { homeSection } from "@/constants/home";
import "./navbar.css";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-small" : ""}`}>
      <nav className="navbar-container flex justify-between items-center w-full">
        {/* Logo derecha */}
        <div className="navbar-left">
          <Link href="/">
            <img
              src="/KyDazul.png"
              alt="Logo"
              className="navbar-logo"
            />
          </Link>
        </div>

        {/* Links del centro */}
        <div className="navbar-center">
          {[
            { href: "/", label: homeSection.title },
            { href: "/about", label: aboutSection.title },
            { href: "/services", label: servicesSection.title },
            { href: "/contact", label: contactSection.title },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${
                pathname === href ? "active" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Redes sociales */}
        <div className="navbar-right">
          <Link href={`https://www.instagram.com/${contactInfo.instagram.data}`} target="_blank" rel="noopener noreferrer" className="social-link">
            <img src={contactInfo.instagram.logo} alt="Instagram" className="w-6 h-6" />
          </Link>
          <Link href={`https://www.linkedin.com/in/${contactInfo.linkedin.data}`} target="_blank" rel="noopener noreferrer" className="social-link">
            <img src={contactInfo.linkedin.logo} alt="LinkedIn" className="w-6 h-6" />
          </Link>
          <Link href={`mailto:${contactInfo.email.data}`} className="social-link">
            <img src={contactInfo.email.logo} alt="Email" className="w-6 h-6" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
