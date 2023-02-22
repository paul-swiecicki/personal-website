import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/ps-logo.svg'
import './Navbar.scss'

const links = {
  home: 'Home',
  work: 'My work',
  skills: 'My skills',
  contact: 'Contact',
}

function NavLink({ children, href }: { children: string; href: string }) {
  return (
    <li className="navbar__link">
      <Link href={href}>{children}</Link>
    </li>
  )
}

export default function Navbar() {
  const mapLinks = (links: Record<string, string>): JSX.Element[] => {
    return Object.entries(links).map(([path, name]) => {
      return (
        <NavLink key={path} href={'#' + path}>
          {name}
        </NavLink>
      )
    })
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Image src={logo} alt="" />
      </div>
      <ol className="navbar__links">{mapLinks(links)}</ol>
    </nav>
  )
}
