import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/ps-logo.svg'
import { links } from '../data/links'
import './Navbar.scss'

function NavLink({
  children,
  href,
  key,
}: {
  children: string
  href: string
  key: string
}) {
  return (
    <li className="navbar__link" key={key}>
      <Link href={href}>{children}</Link>
    </li>
  )
}

export default function Navbar() {
  const mapLinks = (links: Record<string, string>): JSX.Element[] => {
    return Object.entries(links).map(([path, name]) => (
      <NavLink key={path} href={'#' + path}>
        {name}
      </NavLink>
    ))
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
