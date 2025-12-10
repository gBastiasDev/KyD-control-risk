"use client"

import Link from "next/link"
import { useState } from "react"

import { aboutSection } from "@/constants/about"

import "./about.css"

export default function About() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const columns = 3
  const teamRows = Array.from(
    { length: Math.ceil(aboutSection.team.length / columns) },
    (_, rowIndex) =>
      aboutSection.team.slice(
        rowIndex * columns,
        rowIndex * columns + columns
      )
  )

  const hoveredRow =
    hoveredIndex !== null ? Math.floor(hoveredIndex / columns) : null

  // Separar el contenido en párrafo introductorio y características
  const contentParts = aboutSection.content.split('\n')
  const introText = contentParts[0]
  const features = contentParts.slice(1).filter(line => line.trim() !== '')
  const finalText = features.pop() // "Conoce más de nuestro equipo:"

  return (
    <div className="about-page">
      <div className="about-hero">
        <h2>{aboutSection.title}</h2>
        <div className="about-content">
          <p className="about-intro">{introText}</p>
          <ul className="about-features">
            {features.map((feature, index) => (
              <li key={index}>{feature.trim()}</li>
            ))}
          </ul>
          {finalText && <p className="about-cta">{finalText}</p>}
        </div>
      </div>

      <div className="team-grid">
        {teamRows.map((row, rowIndex) => {
          const isRowHovered = hoveredRow === rowIndex

          return (
            <div
              key={`team-row-${rowIndex}`}
              className={[
                "team-row",
                isRowHovered ? "team-row--expanded" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {row.map((member, columnIndex) => {
                const cardIndex = rowIndex * columns + columnIndex
                const isHovered = hoveredIndex === cardIndex
                const isSameRow =
                  hoveredRow !== null && hoveredRow === rowIndex

                let stateClass = ""
                if (isHovered) {
                  stateClass = "team-card--expanded"
                } else if (hoveredIndex !== null && isSameRow) {
                  const direction =
                    columnIndex < (hoveredIndex % columns) ? "left" : "right"
                  stateClass = `team-card--shift-${direction}`
                } else if (hoveredIndex !== null) {
                  stateClass = "team-card--dimmed"
                }

                return (
                  <div
                    key={member.name}
                    className={["team-card", stateClass]
                      .filter(Boolean)
                      .join(" ")}
                    onMouseEnter={() => setHoveredIndex(cardIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      src={member.imgUrl}
                      alt={member.name}
                      className="team-card__image"
                    />
                    <div className="team-card__scrim" />
                    <div className="team-card__content">
                      <p className="team-card__title">{member.title}</p>
                      <h3 className="team-card__name">{member.name}</h3>
                      <p className="team-card__bio">{member.bio}</p>
                      <Link href="/about" className="team-card__cta">
                        Conoce más
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}