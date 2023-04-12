'use client'

import { Icon } from '@iconify/react'
import './Skill.scss'

interface Props {
  name: string
  badge: string
  key: string
}
export function Skill({ badge, name }: Props) {
  return (
    <div className="skill" key={badge}>
      <Icon className="skill__icon" icon={badge} />
      <span className="skill__label">{name}</span>
    </div>
  )
}
