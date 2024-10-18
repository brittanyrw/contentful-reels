import Link from 'next/link'
import { draftMode } from 'next/headers'

import Medias from './medias'


import { getAllMediaPosts } from '@/lib/api'

function Intro() {
  return (
    <section className="hero">
      <h1 className="title">
        <Link href="/">
          Contentful Reels.
        </Link>
      </h1>
      <p className="intro">
        Check out this collection of the TV shows and movies React Advanced attendees love. ❤️
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
