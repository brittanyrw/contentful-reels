import './globals.css'
import Shapes from "../assets/Shapes2.svg"
import { Poppins, Roboto_Flex } from 'next/font/google';


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
 

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <h3>Contentful Reels.</h3>
        <p>Built with Next.js and Contentful.</p>
      </div>
      <div className="footer-link">
        <a href="https://github.com/brittanyrw/storylines-workshop" target="_blank">GitHub</a>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body style={{
      backgroundImage: `url(${Shapes.src})`,
      height: '100px',
    }} suppressHydrationWarning={true}>
        <section>
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  )
}
