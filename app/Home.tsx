import Image from 'next/image'
import logo from '../public/ps-logo.svg'
import rightArrow from '../public/arrow-forward-sharp.svg'
import './Home.scss'

export default function Home() {
  return (
    <section className="home">
      <Image className="home__logo" src={logo} alt="" loading="eager"></Image>

      <h1 className="home__title">Paul Ś.</h1>
      <p className="home__subtitle">Web Developer</p>
      <p className="home__description">
        I'm a web developer who loves to progress and learn new things. I work
        mainly in frontend but I also know a few things about backend and have a
        little bit of design sense. All of that is confirmed by this and other
        websites and projects I created, so go ahead and check them out!
      </p>

      <button className="home__btn-down">
        my work <Image src={rightArrow} alt=""></Image>
      </button>
    </section>
  )
}
