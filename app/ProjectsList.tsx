import EP from '../public/EP.png'
import AutoEtlog from '../public/auto-etlog.jpg'
import BloonBot from '../public/bloonbot.png'
import Project from './Project'
import './Project.scss'

export default function ProjectsList() {
  return (
    <section className="projects">
      <h2>My work</h2>
      <Project
        title="This website"
        imgSrc={EP}
        tags={['frontend', 'design', 'web']}
        techStack={[
          'next',
          'react',
          'typescript',
          'scss',
          'javascript',
          'html',
          'css',
        ]}
        githubLink="https://github.com/paul-swiecicki/personal-website"
      >
        Be careful, recursion has been detected in the area!
      </Project>

      <Project
        title="Euro Papryka"
        imgSrc={EP}
        tags={['frontend', 'design', 'web']}
        techStack={[
          'react',
          'gatsby',
          'styled components',
          'contentful',
          'javascript',
          'html',
          'css',
        ]}
        liveLink="http://grupy.home.pl/strona/products"
      >
        Website for vegetable & fruit supplier. Features, among others, CMS
        integration (Contentful), internationalization and e-mail contact form.
      </Project>

      <Project
        title="Auto EtLog"
        imgSrc={AutoEtlog}
        tags={['frontend', 'backend', 'desktop']}
        techStack={['electron', 'html', 'javascript', 'css']}
        githubLink="https://github.com/paul-swiecicki/auto-etlog"
      >
        App built on Electron.js for the vegetable supplier that automates
        printing logistical labels by extracting data from Excel file,
        calculating it and scraping ETlog app using Robot.js. Reduced amount of
        manual work needed for the task by about 70%.
      </Project>

      <Project
        title="BloonBot"
        imgSrc={BloonBot}
        tags={['frontend', 'backend', 'web', 'design']}
        techStack={[
          'react',
          'scss',
          'python',
          'node',
          'express',
          'mongodb',
          'javascript',
          'html',
          'css',
        ]}
        githubLink="https://github.com/paul-swiecicki/bloonbot-website"
        liveLink="https://paul-swiecicki.github.io/bloonbot-website/"
      >
        BloonBot is a highly customizable chatbot making use of RegEx built on
        JavaScript that has its installer, file management, website (built using
        React & SCSS), and backend with authentication allowing for saving
        settings.
      </Project>
    </section>
  )
}
