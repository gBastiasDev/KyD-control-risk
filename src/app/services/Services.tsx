'use client'

import { useEffect, useRef, useState } from 'react'
import { servicesSection } from '@/constants/services'
import './services.css'

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animationState, setAnimationState] = useState<'idle' | 'exiting' | 'entering'>('idle')
  const services = servicesSection.services

  const pendingIndexRef = useRef<number | null>(null)
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current)
      }
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current)
      }
    }
  }, [])

  const triggerSlideChange = (newIndex: number) => {
    if (newIndex === currentIndex) {
      return
    }

    if (animationState !== 'idle') {
      return
    }

    pendingIndexRef.current = newIndex
    setAnimationState('exiting')

    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current)
    }

    exitTimeoutRef.current = setTimeout(() => {
      exitTimeoutRef.current = null

      if (pendingIndexRef.current === null) {
        return
      }

      setCurrentIndex(pendingIndexRef.current)
      setAnimationState('entering')

      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current)
      }

      enterTimeoutRef.current = setTimeout(() => {
        enterTimeoutRef.current = null
        setAnimationState('idle')
        pendingIndexRef.current = null
      }, 500)
    }, 500)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? services.length - 1 : currentIndex - 1
    triggerSlideChange(newIndex)
  }

  const goToNext = () => {
    const newIndex = currentIndex === services.length - 1 ? 0 : currentIndex + 1
    triggerSlideChange(newIndex)
  }

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      triggerSlideChange(index)
    }
  }

  const currentService = services[currentIndex]

  return (
    <div className="services-container">
      <h2 className="text-3xl font-semibold mb-4">{servicesSection.title}</h2>

      <div className="carousel-wrapper">
        <div className="carousel-content">
          <div className={`carousel-main-content ${animationState}`}>
            <div className="carousel-image">
              <img
                src={currentService.imgUrl}
                alt={currentService.name}
                className="carousel-img"
              />
            </div>
            <div className="carousel-text">
              <h3 className="carousel-title">{currentService.name}</h3>
              <p className="carousel-description">{currentService.description ?? ''}</p>
            </div>
          </div>

          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrevious}
            aria-label="Servicio anterior"
          >
            &#8249;
          </button>

          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Siguiente servicio"
          >
            &#8250;
          </button>

          <div className="carousel-dots">
            {services.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir al servicio ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
