"use client"; // Mark this as a client component to handle state

import React, { useState } from 'react';
import Medias from './medias';
import Stats from './stats';

export default function FilteredMedias({ posts }: { posts: any[] }) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter posts based on the selected genre, type, and search query
  const filteredPosts = posts.filter(post => {
    const matchesGenre = selectedGenre ? post.genres.includes(selectedGenre) : true;
    const matchesType = selectedType ? post.type === selectedType : true;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesType && matchesSearch;
  });

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const handleResetFilter = () => {
    setSelectedGenre(null);
    setSelectedType(null); // Reset type filter
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="filtered-medias">
      <Stats 
        posts={posts} 
        selectedGenre={selectedGenre} 
        selectedType={selectedType} // Pass selected type to Stats
        onGenreClick={handleGenreClick} 
        onTypeClick={handleTypeClick} // Pass type click handler to Stats
        onResetFilter={handleResetFilter} 
      />

      {/* Conditionally render the search input only when there are 10 or more items */}
      {posts.length >= 10 && (
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search by title..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
            className="search-input"
          />
        </div>
      )}
      
      <Medias posts={filteredPosts} />
    </div>
  );
}
