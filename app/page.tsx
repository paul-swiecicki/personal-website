import Image from 'next/image'
import logo from '../public/ps-logo.svg'

export default function Home() {
  return (
    <main>
      <Image src={logo} alt="" loading="eager"></Image>

      <h1 className="title">Paul Ś</h1>
      <p className="subtitle">Web Developer</p>
      <p className="description">
        I'm a web developer who loves to progress and learn new things. I work
        mainly in frontend but I also know a few things about backend and have a
        little bit of design sense. All of that is confirmed by this and other
        websites and projects I created, so go ahead and check them out!
      </p>

      <button className="btn-down">my work</button>
    </main>
  )
}
