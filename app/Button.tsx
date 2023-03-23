import { PropsWithChildren } from 'react'
import './Button.scss'

interface Props {
  link: string
}

export default function Button({ link, children }: PropsWithChildren<Props>) {
  return (
    <form action={link} target="blank" className="btn">
      <button className="btn__inner">{children}</button>
    </form>
  )
}
