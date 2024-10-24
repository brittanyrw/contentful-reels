export default function Stats({
  posts,
  selectedGenre,
  onGenreClick,
  onResetFilter
}: {
  posts: any[],
  selectedGenre: string | null,
  onGenreClick: (genre: string) => void,
  onResetFilter: () => void
}) {
  // Calculate genre statistics
  const genreCount: { [key: string]: number } = {};

  posts.forEach(post => {
    post.genres.forEach((genre: string) => {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });
  });

  const sortedGenres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);

  const totalItems = posts.length;
  const movieCount = posts.filter(post => post.type === 'Movie').length;
  const tvShowCount = posts.filter(post => post.type === 'TV Show').length;
  const titleCount: { [key: string]: number } = {};
  
  posts.forEach(post => {
    const sanitizedTitle = post.title.toLowerCase();
    titleCount[sanitizedTitle] = (titleCount[sanitizedTitle] || 0) + 1;
  });

  const mostAddedTitle = Object.entries(titleCount).reduce((prev, current) => 
    current[1] > prev[1] ? current : prev, ["", 0]
  );

  const totalReleaseYear = posts.reduce((sum, post) => sum + post.yearReleased, 0);
  const averageReleaseYear = totalItems > 0 ? Math.round(totalReleaseYear / totalItems) : "N/A";

  return (
    <section className="stats-container container">
      <ul className="stats">
        <li className="stat stat-blue">
          <p className="stat-number">{totalItems}</p>
          <p className="stat-name">Total Items</p>
        </li>
        <li className="stat stat-yellow">
          <p className="stat-number">{movieCount}</p>
          <p className="stat-name">Movies</p>
        </li>
        <li className="stat stat-red">
          <p className="stat-number">{tvShowCount}</p>
          <p className="stat-name">TV Shows</p>
        </li>

        {mostAddedTitle[1] > 1 && (
          <li className="stat stat-green">
            <p className="stat-number stat-most-added">
              {mostAddedTitle[0]} ({mostAddedTitle[1]})
            </p>
            <p className="stat-name">Most Added</p>
          </li>
        )}

        <li className="stat stat-blue">
          <p className="stat-number">{averageReleaseYear}</p>
          <p className="stat-name">Avg Release Year</p>
        </li>
      </ul>
      
      {/* Genre stats with filter info */}
      <ul className="stats genre-stats">
        {sortedGenres.map(([genre, count]) => (
          <li 
            key={genre} 
            className={`stat ${selectedGenre === genre ? 'active' : ''}`} 
            onClick={() => onGenreClick(genre)}
          >
            <p className="stat-number">{count}</p>
            <p className="stat-name">{genre}</p>
          </li>
        ))}
      </ul>
      
      {/* Filter Info: Show only when a genre is selected */}
      {selectedGenre && (
        <div className="filter-info">
          <p>Filtering by: <strong>{selectedGenre}</strong></p>
          <button className="filter-button" onClick={onResetFilter}>Clear Filter</button>
        </div>
      )}
    </section>
  );
}
