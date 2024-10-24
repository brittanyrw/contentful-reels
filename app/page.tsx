import Link from 'next/link';
import Medias from './medias';
import Stats from './stats';
import Header from "../assets/header.svg";
import { getAllMediaPosts } from '@/lib/api';
import FilteredMedias from './filtered-medias';


function Intro() {
  return (
    <section className="hero">
      <div className="hero-image" style={{
        backgroundImage: `url(${Header.src})`,
        height: '100px',
      }}></div>
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
  const allPosts = await getAllMediaPosts(false); // Keep this in the server component

  return (
    <div>
      <Intro />
      <FilteredMedias posts={allPosts} />
    </div>
  );
}
