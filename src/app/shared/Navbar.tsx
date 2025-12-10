"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { servicesSection } from "@/constants/services";
import { aboutSection } from "@/constants/about";
import { contactSection, contactInfo } from "@/constants/contact";
import { homeSection } from "@/constants/home";
import "./navbar.css";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Solo detectar la sección activa si estamos en la página principal
      if (!isHomePage) return;
      
      // Detectar la sección activa basándose en la posición del scroll
      const sections = ["home", "about", "services", "contact"];
      const scrollPosition = window.scrollY + 200; // Offset para activar antes

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (isHomePage) {
      handleScroll(); // Llamar una vez al montar para establecer el estado inicial
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 130; // Altura del navbar
      const offsetTop = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    if (isHomePage) {
      // Si ya estamos en la página principal, hacer scroll suave
      scrollToSection(sectionId);
    } else {
      // Si estamos en otra página, navegar a la página principal con el hash
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-small" : ""}`}>
      <nav className="navbar-container flex justify-between items-center w-full">
        {/* Logo derecha */}
        <div className="navbar-left">
          {isHomePage ? (
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="navbar-logo-link"
            >
              <img
                src="/KyDazul.png"
                alt="Logo"
                className="navbar-logo"
              />
            </a>
          ) : (
            <Link
              href="/#home"
              className="navbar-logo-link"
            >
              <img
                src="/KyDazul.png"
                alt="Logo"
                className="navbar-logo"
              />
            </Link>
          )}
        </div>

        {/* Links del centro */}
        <div className="navbar-center">
          {[
            { id: "home", label: homeSection.title },
            { id: "about", label: aboutSection.title },
            { id: "services", label: servicesSection.title },
            { id: "contact", label: contactSection.title },
          ].map(({ id, label }) => {
            if (isHomePage) {
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`nav-link ${
                    activeSection === id ? "active" : ""
                  }`}
                >
                  {label}
                </a>
              );
            } else {
              return (
                <Link
                  key={id}
                  href={`/#${id}`}
                  className="nav-link"
                >
                  {label}
                </Link>
              );
            }
          })}
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
