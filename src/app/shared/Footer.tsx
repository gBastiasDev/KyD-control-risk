import Link from "next/link";
import Image from "next/image";
import { contactInfo } from "@/constants/contact";
import { contactSection } from "@/constants/contact";
import { aboutSection } from "@/constants/about";
import { servicesSection } from "@/constants/services";
import { homeSection } from "@/constants/home";
import { company } from "@/constants/general";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo Izquierda */}
        <div className="footer-left">
          <Link href="/">
            <Image
              src="/KyDfull.png"
              alt="Logo KyD"
              width={140}
              height={60}
              className="footer-logo"
            />
          </Link>

          <p className="footer-description">
            {company.description}
          </p>
        </div>

        {/* Contacto Centro */}
        <div className="footer-center">
          {Object.entries(contactInfo).map(([key, { data, logo }]) => (
            <div key={key} className="contact-item">
              <Image src={logo} alt={key} width={18} height={18} />
              {key === "email" ? (
                <a href={`mailto:${data}`} className="contact-link">{data}</a>
              ) : key === "phone" ? (
                <a href={`tel:${data}`} className="contact-link">{data}</a>
              ) : key === "instagram" ? (
                <a
                  href={`https://instagram.com/${data}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  @{data}
                </a>
              ) : key === "linkedin" ? (
                <a
                  href={`https://linkedin.com/company/${data}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  {data}
                </a>
              ) : (
                <span className="contact-link">{data}</span>
              )}
            </div>
          ))}
        </div>

        {/* Navegación Derecha */}
        <div className="footer-right">
          <Link href="/">{homeSection.title}</Link>
          <Link href="/about">{aboutSection.title}</Link>
          <Link href="/services">{servicesSection.title}</Link>
          <Link href="/contact">{contactSection.title}</Link>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} KyD Control Risk. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
