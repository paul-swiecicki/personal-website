import Home from './Home'
import NumNav from './NumNav'
import './page.scss'
import ProjectsList from './ProjectsList'
import { SkillsList } from './SkillsList'

export default function Index() {
  return (
    <main>
      <Home />
      <ProjectsList />
      <NumNav />
      <SkillsList />
    </main>
  )
}
