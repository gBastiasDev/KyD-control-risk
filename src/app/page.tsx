'use client'

import { useEffect, useRef, useState } from 'react'
import Contact from './contact/Contact';
import About from './about/About';
import Services from './services/Services';
import { homeSection } from '@/constants/home';
import { company } from '@/constants/general';

import './home.css'

export default function HomePage() {
  const visionRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const [visionVisible, setVisionVisible] = useState(false)
  const [missionVisible, setMissionVisible] = useState(false)

  useEffect(() => {
    const visionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisionVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const missionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMissionVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (visionRef.current) {
      visionObserver.observe(visionRef.current)
    }
    if (missionRef.current) {
      missionObserver.observe(missionRef.current)
    }

    return () => {
      if (visionRef.current) {
        visionObserver.unobserve(visionRef.current)
      }
      if (missionRef.current) {
        missionObserver.unobserve(missionRef.current)
      }
    }
  }, [])

  // Manejar el scroll a la sección cuando se carga la página con un hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      // Esperar a que el DOM esté completamente cargado
      setTimeout(() => {
        const section = document.getElementById(hash)
        if (section) {
          const navbarHeight = 130
          const offsetTop = section.offsetTop - navbarHeight
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          })
        }
      }, 100)
    }
  }, [])

  return (
    <section id="home" className="home-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="company-name">{company.name}</h1>
          <p className="company-slogan">{homeSection.subtitle}</p>
          {company.description && (
            <p className="company-description">
              {company.description}
            </p>
          )}
        </div>
      </div>

      <div 
        ref={visionRef}
        className={`vision-container ${visionVisible ? 'visible' : ''}`}
      >
        <div className="vision-content">
          <div className="vision-image-wrapper">
            <img src={homeSection.visionImage} alt="Visión" className="vision-image" />
          </div>
          <div className="vision-text">
            <h3 className="vision-title">Visión</h3>
            <p className="vision-description">
              {homeSection.vision}
            </p>
          </div>
        </div>
      </div>

      <div 
        ref={missionRef}
        className={`mission-container ${missionVisible ? 'visible' : ''}`}
      >
        <div className="mission-content">
          <div className="mission-text">
            <h3 className="mission-title">Misión</h3>
            <p className="mission-description">
              {homeSection.mission}
            </p>
          </div>
          <div className="mission-image-wrapper">
            <img src={homeSection.missionImage} alt="Misión" className="mission-image" />
          </div>
        </div>
      </div>
      
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </section>
  );
}
