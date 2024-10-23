export default function Stats({ posts }: { posts: any[] }) {
  // Calculate total items
  const totalItems = posts.length;

  // Calculate the number of movies
  const movieCount = posts.filter(post => post.type === 'Movie').length;

  // Calculate the number of TV shows
  const tvShowCount = posts.filter(post => post.type === 'TV Show').length;

  // Calculate the stats for genres
  const genreCount: { [key: string]: number } = {};
  
  posts.forEach(post => {
    post.genres.forEach((genre: string) => {
      if (genreCount[genre]) {
        genreCount[genre] += 1;
      } else {
        genreCount[genre] = 1;
      }
    });
  });

  const sortedGenres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);

  const titleCount: { [key: string]: number } = {};
  
  posts.forEach(post => {
    const sanitizedTitle = post.title.toLowerCase(); // Case-insensitive matching
    if (titleCount[sanitizedTitle]) {
      titleCount[sanitizedTitle] += 1;
    } else {
      titleCount[sanitizedTitle] = 1;
    }
  });

  const mostAddedTitle = Object.entries(titleCount).reduce((prev, current) => {
    return current[1] > prev[1] ? current : prev;
  }, ["", 0]);

  const totalReleaseYear = posts.reduce((sum, post) => sum + post.yearReleased, 0);
  const averageReleaseYear = (totalItems > 0) ? Math.round(totalReleaseYear / totalItems) : "N/A";

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
            <p className="stat-name">Most Added Movie/Show</p>
          </li>
        )}

        <li className="stat stat-blue">
          <p className="stat-number">{averageReleaseYear}</p>
          <p className="stat-name">Average Release Year</p>
        </li>
      </ul>
      <ul className="stats genre-stats">
        {sortedGenres.map(([genre, count]) => (
          <li key={genre} className="stat">
            <p className="stat-number">{count}</p>
            <p className="stat-name">{genre}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
