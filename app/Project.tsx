'use client'

import Image, { StaticImageData } from 'next/image'
import { PropsWithChildren, ReactNode } from 'react'

import { Icon } from '@iconify/react'
import Link from 'next/link'

type Tag = 'frontend' | 'backend' | 'design' | 'CMS'

const techBadges = {
  gatsby: 'vscode-icons:file-type-gatsby',
  react: 'vscode-icons:file-type-reactjs',
  'styled components': 'vscode-icons:file-type-styled',
  html: 'vscode-icons:file-type-html',
  contentful: 'logos:contentful',
  javascript: 'vscode-icons:file-type-js-official',
  css: 'vscode-icons:file-type-css',
}

interface Props {
  imgSrc: StaticImageData
  title: string
  tags?: Tag[]
  techStack: (keyof typeof techBadges)[]
  liveLink: string
}

export default function Project({
  imgSrc,
  title,
  tags,
  techStack,
  liveLink,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="project">
      <div className="project__image">
        <Image src={imgSrc} alt="" />
      </div>
      <div className="project__info">
        <div className="project__title">{title}</div>
        <ul className="project__tag-list">
          {tags
            ? tags.map(
                (tag): ReactNode => (
                  <li className="project__tag" key={tag}>
                    {tag}
                  </li>
                ),
              )
            : ''}
        </ul>
        <p className="project__desc">{children}</p>
        <ul className="project__tech-stack">
          {techStack.map((tech) => (
            <li key={tech}>
              <Icon icon={techBadges[tech]} />
            </li>
          ))}
        </ul>

        <div className="project__live-btn">
          <Link href={liveLink}>Live</Link>
          <Icon icon="material-symbols:arrow-right-alt" />
        </div>
      </div>
    </div>
  )
}