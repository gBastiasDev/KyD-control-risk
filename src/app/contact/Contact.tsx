'use client'

import { useState } from 'react'
import { contactInfo, contactSection } from "@/constants/contact"
import "./contact.css"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Crear el contenido del correo
      const subject = encodeURIComponent(`Contacto desde web - ${formData.name}`)
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Teléfono: ${formData.phone}\n\n` +
        `Mensaje:\n${formData.message}`
      )
      
      // Crear el enlace mailto
      const mailtoLink = `mailto:${contactInfo.email.data}?subject=${subject}&body=${body}`
      
      // Abrir el cliente de correo
      window.location.href = mailtoLink
      
      // Simular éxito después de un breve delay
      setTimeout(() => {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
        setIsSubmitting(false)
        
        // Limpiar el mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      }, 500)
    } catch (error) {
      setSubmitStatus('error')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-section">
      <h3 className="contact-title text-2xl font-semibold">{contactSection.title}</h3>
      <p className="contact-description text-gray-600 max-w-2xl mx-auto">
        {contactSection.description}
      </p>

      <div className="contact-info">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nombre *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ingresa tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          {submitStatus === 'success' && (
            <div className="form-message form-message-success">
              ¡Mensaje enviado! Te contactaremos pronto.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="form-message form-message-error">
              Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>
      </div>

      <h3 className="contact-subtitle text-xl font-semibold">También puedes seguirnos en nuestras redes sociales:</h3>
      <div className="social-links-container">
        <div className="social-link-item">
          <a href={`https://www.instagram.com/${contactInfo.instagram.data}`} target="_blank" rel="noopener noreferrer">
            <img src={contactInfo.instagram.logo} alt="Instagram" />
          </a>
        </div>

        <div className="social-link-item">
          <a href={`https://www.linkedin.com/in/${contactInfo.linkedin.data}`} target="_blank" rel="noopener noreferrer">
            <img src={contactInfo.linkedin.logo} alt="LinkedIn" />
          </a>
        </div>

        <div className="social-link-item">
          <a href={`mailto:${contactInfo.email.data}`}>
            <img src={contactInfo.email.logo} alt="Email" />
          </a>
        </div>

        <div className="social-link-item">
          <a href={`tel:${contactInfo.phone.data}`}>
            <img src={contactInfo.phone.logo} alt="Phone" />
          </a>
        </div>
      </div>
    </div>
  )
}