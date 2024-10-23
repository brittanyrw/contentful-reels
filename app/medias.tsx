import MediaCard from './media-card';

export default function Medias({ posts }: { posts: any[] }) {
  return (
    <section className="media-container container">
      {posts.map((post) => (
        <MediaCard
          key={post.slug}
          title={post.title}
          coverImage={post.poster.url}
          yearReleased={post.yearReleased}
          slug={post.slug}
          type={post.type}
          attendeeCompany={post.attendeeCompany}
          genres={post.genres}
        />
      ))}
    </section>
  );
}
