import Link from 'next/link';
import Medias from './medias';
import Stats from './stats';
import Shapes from "../assets/header.svg";
import { getAllMediaPosts } from '@/lib/api';
import FilteredMedias from './filtered-medias'; // Import the FilteredMedias component

function Intro() {
  return (
    <section className="hero">
      <div className="hero-image" style={{
        backgroundImage: `url(${Shapes.src})`,
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
  const allPosts = await getAllMediaPosts(); // Keep this in the server component

  // Filter to exclude anyone from Contentful
  const eligibleRaffleEntries = allPosts.filter(post => post.attendeeCompany !== 'Contentful');

  // Select a random attendee for the raffle
  let randomRaffleEntry = null;
  if (eligibleRaffleEntries.length > 0) {
    const randomIndex = Math.floor(Math.random() * eligibleRaffleEntries.length);
    randomRaffleEntry = eligibleRaffleEntries[randomIndex];
  }

  return (
    <div>
      <Intro />
      <FilteredMedias posts={allPosts} />
      
      {/* Random Raffle Section */}
      {randomRaffleEntry && (
        <div className="raffle-section">
          <p>{randomRaffleEntry.attendeeName} who entered {randomRaffleEntry.title} has won the {randomRaffleEntry.raffleEntry}</p>
        </div>
      )}
    </div>
  );
}
