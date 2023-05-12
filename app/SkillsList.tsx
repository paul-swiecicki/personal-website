'use client'

import { Icon } from './Icon'
import React, { useState } from 'react'
import { skills, Skills } from '../data/skills'
import { Skill } from './Skill'
import './SkillsList.scss'

enum View {
  'atom',
  'grid',
}

export function SkillsList() {
  const [view, setView] = useState<View>(View.atom)

  const mapSkills = (skills: Skills) => {
    let nodes: JSX.Element[] = []

    for (const category in skills) {
      const skillsInCategory = skills[category]
      nodes.push(
        <div className="skills__category" key={category}>
          <span className="skills__category-label">{category}</span>
          <div className="skills__badges">
            {skillsInCategory.map(({ name, badge, since }) => (
              <Skill badge={badge} name={name} key={name}></Skill>
            ))}
          </div>
        </div>,
      )
    }

    return <>{nodes}</>
  }

  return (
    <section className="skills" id="skills">
      <h2>My Skills</h2>
      {/* <div className="view">
        <p className="view__label">view</p>
        <div className="view__icons">
          <div
            className={`view__icon ${
              view === View.atom ? ' view__icon--chosen' : ''
            }`}
            onClick={() => setView(View.atom)}
          >
            <Icon icon="tabler:sun-low"></Icon>
          </div>
          <div
            className={`view__icon ${
              view === View.grid ? ' view__icon--chosen' : ''
            }`}
            onClick={() => setView(View.grid)}
          >
            <Icon icon="material-symbols:grid-on-sharp"></Icon>
          </div>
        </div>
      </div> */}
      {mapSkills(skills)}
    </section>
  )
}
