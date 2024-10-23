"use client"; // Mark this as a client component to handle state

import { useState } from 'react';
import Medias from './medias';
import Stats from './stats';

export default function FilteredMedias({ posts }: { posts: any[] }) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Function to handle genre click
  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? null : genre); // Toggle filter
  };

  // Filter posts based on selected genre
  const filteredPosts = selectedGenre
    ? posts.filter(post => post.genres.includes(selectedGenre))
    : posts;

  return (
    <div>
      <Stats posts={posts} onGenreClick={handleGenreClick} />
      <section className="home-medias">
        <Medias posts={filteredPosts} />
      </section>
    </div>
  );
}
