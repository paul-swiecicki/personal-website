import React from 'react'
import { skills, Skills } from '../data/skills'
import { Skill } from './Skill'
import './SkillsList.scss'

export function SkillsList() {
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
    <section className="skills">
      <h2>My Skills</h2>
      {mapSkills(skills)}
    </section>
  )
}
