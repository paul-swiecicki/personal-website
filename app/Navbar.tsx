'use client'

import Image from 'next/image'
import logo from '../public/ps-logo.svg'
import burger from '../public/burger-menu.svg'
import { links } from '../data/links'
import './Navbar.scss'
import { useState } from 'react'

function NavLink({
  children,
  href,
  parentClass,
}: {
  children: string
  href: string
  key: string
  parentClass: string
}) {
  return (
    <a href={href}>
      <li className={`${parentClass}__link`}>{children}</li>
    </a>
  )
}

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const mapLinks = (
    links: Record<string, string>,
    parentClass: string = 'navbar',
  ): JSX.Element[] => {
    return Object.entries(links).map(([path, name]) => (
      <NavLink href={'#' + path} key={path} parentClass={parentClass}>
        {name}
      </NavLink>
    ))
  }

  const handleToggleMenu = (open: boolean) => {
    setMenuOpen(open)
  }

  return (
    <>
      <div className="navbar-wrapper">
        <div className="navbar-blurry-bg"></div>
        <nav className="navbar">
          <div className="navbar__logo">
            <Image src={logo} alt="" />
          </div>
          <ul className="navbar__links">{mapLinks(links)}</ul>
          <div
            className="navbar__burger"
            onClick={() => handleToggleMenu(true)}
          >
            <Image src={burger} alt="menu"></Image>
          </div>
        </nav>
        <div
          onClick={() => handleToggleMenu(false)}
          className={`mobile-nav-wrapper ${
            isMenuOpen ? '' : 'mobile-nav-wrapper--hidden'
          }`}
        >
          <div className="mobile-nav">{mapLinks(links, 'mobile-nav')}</div>
        </div>
      </div>
    </>
  )
}
