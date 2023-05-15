import Home from './Home'
import './page.scss'
import ProjectsList from './ProjectsList'
import { SkillsList } from './SkillsList'

export default function Index() {
  return (
    <main>
      <Home />
      <ProjectsList />
      <SkillsList />
    </main>
  )
}
