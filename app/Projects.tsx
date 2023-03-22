import EP from '../public/EP.png'
import Project from './Project'
import './Project.scss'

export default function Projects() {
  return (
    <section className="projects">
      <h2>My work</h2>
      <Project
        title="Euro Papryka"
        imgSrc={EP}
        tags={['frontend', 'design']}
        techStack={[
          'react',
          'gatsby',
          'styled components',
          'contentful',
          'html',
          'javascript',
          'css',
        ]}
        liveLink="http://grupy.home.pl/strona/products"
      >
        Website for vegetable & fruit supplier. Features, among others, CMS
        integration (Contentful), internationalization and e-mail contact form.
      </Project>
    </section>
  )
}
