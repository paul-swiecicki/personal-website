import { techBadges as tb } from './techBadges'

type Skills = Record<string, { name: string; badge: string; since: number }[]>

const skills: Skills = {
  frontend: [
    { name: 'JavaScript', badge: tb.javascript, since: 2018 },
    { name: 'TypeScript', badge: tb.typescript, since: 2022 },
    { name: 'React', badge: tb.react, since: 2020 },
    { name: 'Redux', badge: tb.redux, since: 2020 },
    { name: 'Next', badge: tb.next, since: 2023 },
    { name: 'Gatsby', badge: tb.gatsby, since: 2021 },
    { name: 'HTML', badge: tb.html, since: 2018 },
    { name: 'SCSS', badge: tb.scss, since: 2020 },
    { name: 'CSS', badge: tb.css, since: 2018 },
    {
      name: 'Styled Components',
      badge: tb['styled components'],
      since: 2021,
    },
    { name: 'RWD', badge: tb.rwd, since: 2019 },
  ],
  backend: [
    { name: 'Node', badge: tb.node, since: 2020 },
    { name: 'MongoDB', badge: tb.mongodb, since: 2020 },
    { name: 'Express', badge: tb.express, since: 2020 },
    { name: 'Docker', badge: tb.docker, since: 2022 },
    { name: 'MySQL', badge: tb.mysql, since: 2018 },
    { name: 'PHP', badge: tb.php, since: 2018 },
    { name: 'GraphQL', badge: tb.graphql, since: 2021 },
  ],
  design: [
    { name: 'Figma', badge: tb.figma, since: 2019 },
    { name: 'Photoshop', badge: tb.photoshop, since: 2017 },
    { name: 'Illustrator', badge: tb.illustrator, since: 2020 },
    { name: 'After Effects', badge: tb['after effects'], since: 2015 },
  ],

  other: [
    { name: 'Git', badge: tb.git, since: 2019 },
    { name: 'GitHub', badge: tb.github, since: 2019 },
    { name: 'Linux', badge: tb.linux, since: 2018 },
    { name: 'RegEx', badge: tb.regex, since: 2020 },
    { name: 'Mocha Tests', badge: tb.mocha, since: 2022 },
    { name: 'VSCode', badge: tb.vscode, since: 2019 },
  ],
}

export { skills }
export type { Skills }
