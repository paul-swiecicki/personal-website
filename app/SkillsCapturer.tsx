'use client'

// react element screenshot - publish on npm

import React, { useRef } from 'react'
import { skills, Skills } from '../data/skills'
import './SkillsList.scss'
import './SkillsCapturer.scss'
import html2canvas from 'html2canvas'
import { Icon as IconifyIcon } from '@iconify/react'

enum View {
  'atom',
  'grid',
}

const screenshotDimensions = 80

export function SkillsCapturer() {
  const refs = Array.from(Array(50), () => useRef(null))

  setTimeout(() => {
    handleCapture()
  }, 2000)

  const handleCapture = async () => {
    let skillCounter = 0

    for (const category in skills) {
      const skillsInCategory = skills[category]

      for (let i = 0; i < skillsInCategory.length; i++) {
        const elementToCapture = refs[skillCounter].current
        skillCounter++

        if (elementToCapture) {
          try {
            const canvas = await html2canvas(elementToCapture, {
              scale: 1,
              backgroundColor: 'none',
              logging: false,
            })
            const dataUrl = canvas.toDataURL() // Default format is PNG

            // Send the data URL to the server for saving
            await saveScreenshot(dataUrl, skillsInCategory[i].name)
          } catch (error) {
            console.error('Error capturing screenshot:', error)
          }
        }
      }
    }
    console.log(skillCounter)
  }

  const saveScreenshot = async (dataUrl: string, iconName: string) => {
    try {
      await fetch('http://localhost:3002/api/screenshot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataUrl, iconName }),
      })
    } catch (error) {
      console.error('Error saving screenshot:', error)
    }
  }

  const mapSkills = (skills: Skills) => {
    let nodes: JSX.Element[] = []
    let counter = 0

    for (const category in skills) {
      const skillsInCategory = skills[category]
      nodes.push(
        <div className="skills__category" key={category}>
          <span className="skills__category-label">{category}</span>
          <div className="skills__badges">
            {skillsInCategory.map(({ name, badge, since }, i) => {
              counter++
              return (
                <div
                  className="skills-capturer__skill"
                  ref={refs[counter - 1]}
                  key={name}
                >
                  <IconifyIcon
                    height={screenshotDimensions}
                    width={screenshotDimensions}
                    icon={badge}
                  ></IconifyIcon>
                </div>
              )
            })}
          </div>
        </div>,
      )
    }

    return <>{nodes}</>
  }

  return (
    <section className="skills" id="skills">
      {mapSkills(skills)}
    </section>
  )
}
