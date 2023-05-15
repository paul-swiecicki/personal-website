import { Icon } from './Icon'
import './Footer.scss'
import ArrowUp from '../public/arrow-up.svg'
import Image from 'next/image'

const socials = {
  LinkedIn: {
    link: 'https://www.linkedin.com/in/pawe%C5%82-%C5%9Bwi%C4%99cicki-99389b215/',
    icon: 'mdi:linkedin',
  },
  GitHub: { link: 'https://github.com/paul-swiecicki', icon: 'mdi:github' },
  Telegram: {
    link: '',
    icon: 'icon-park-outline:telegram',
  },
}

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__wrapper">
        <div className="footer__section--mail">
          <div className="footer__icon">
            <Icon icon="ic:sharp-mail-outline"></Icon>
          </div>
          <div>
            <div className="footer__label">E-mail:</div>
            <div className="footer__text">paul.swiecicki2@gmail.com</div>
          </div>
        </div>
        <a href="#home">
          <div className="footer__section--top">
            <div className="footer__icon footer__icon--up">
              <Image src={ArrowUp} alt="" />
            </div>
            <div className="footer__text">Back To Top</div>
          </div>
        </a>
        <div className="footer__section--socials">
          {Object.entries(socials).map(([name, { link, icon }]) => (
            <a className="social" target="_blank" href={link} key={name}>
              <div className="social__text">{name}</div>
              <div className="social__icon">
                <Icon icon={icon}></Icon>
              </div>
            </a>
          ))}
        </div>
        <div className="footer__section--copyright">
          Copyright &copy; 2023 Paul&nbsp;Ś.
        </div>
      </div>
    </footer>
  )
}
