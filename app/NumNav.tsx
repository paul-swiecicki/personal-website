import { links } from '../data/links'
import './NumNav.scss'

export default function NumNav() {
  const placeNavNums = (links: Record<string, string>) => {
    let linkCount = 0

    return Object.keys(links).map((key) => {
      linkCount++

      return (
        <li
          key={linkCount}
          className={`num-nav__number ${
            linkCount === 1 ? 'num-nav__number--active' : ''
          }`}
        >{`0${linkCount}`}</li>
      )
    })
  }

  return <ol className="num-nav">{placeNavNums(links)}</ol>
}
