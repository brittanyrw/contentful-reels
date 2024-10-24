"use client"; // Mark this as a client component to handle state

import React, { useState } from 'react';
import Medias from './medias';
import Stats from './stats';

export default function FilteredMedias({ posts }: { posts: any[] }) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Filter posts based on the selected genre
  const filteredPosts = selectedGenre
    ? posts.filter(post => post.genres.includes(selectedGenre))
    : posts;

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleResetFilter = () => {
    setSelectedGenre(null); // Reset genre filter
  };

  return (
    <div className="filtered-medias">
      <Stats 
        posts={posts} 
        selectedGenre={selectedGenre} 
        onGenreClick={handleGenreClick} 
        onResetFilter={handleResetFilter} 
      />
      <Medias posts={filteredPosts} />
    </div>
  );
}

