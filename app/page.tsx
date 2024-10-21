import Link from 'next/link'
import { draftMode } from 'next/headers'
import ContentfulImage from "../lib/contentful-image"

import Shapes from "../assets/shapes.svg"
import Medias from './medias'


import { getAllMediaPosts } from '@/lib/api'

function Intro() {
  return (
    <section className="hero">
      <div className="hero-image" style={{
      backgroundImage: `url(${Shapes.src})`,
      height: '100px',
    }}></div>
      {/* <ContentfulImage
            src={Shapes}
            height="100"
            className="rounded-full"
            alt="favorite image tag"
          /> */}
      <h1 className="title">
        <Link href="/">
          Contentful Reels.
        </Link>
      </h1>
      <p className="intro">
        Collection of the TV shows and movies React Advanced attendees love. ❤️
      </p>

    </section>
  )
}

export default async function Page() {
  const { isEnabled } = draftMode()
  const allPosts = await getAllMediaPosts(isEnabled)

  return (
    <div>
      <Intro />
      <section className="home-albums">
        <Medias posts={allPosts} />
      </section>
    </div>
  )
}
