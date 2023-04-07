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
        <div className="skills__category">
          <span className="skills__category-label">{category}</span>
          <div className="skills__badges">
            {skillsInCategory.map((skill) => (
              <Skill badge={skill.badge} name={skill.name}></Skill>
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
