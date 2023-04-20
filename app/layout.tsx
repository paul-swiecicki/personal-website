import './globals.scss'
import Navbar from './Navbar'
import { Montserrat } from '@next/font/google'
import Footer from './Footer'

const font = Montserrat({ subsets: ['latin', 'latin-ext'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={font.className}>
        <div className="wrapper">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
