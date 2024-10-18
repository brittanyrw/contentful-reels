import Link from 'next/link'
import CoverImage from './cover-image'
import ContentfulImage from "../lib/contentful-image"
import FavoriteImage from "../assets/favorite.svg"

export default function MediaCard({
  title,
  coverImage,
  yearReleased,
  slug,
  type,
  attendeeCompany
}: {
  title: string
  coverImage: any
  slug: string
  yearReleased: number
  type: string,
  attendeeCompany: string
}) {
  return (
    <div className="album">
      <div className="album-content">
        {attendeeCompany == "Contentful" && <div className="favorite">
          <ContentfulImage
            src={FavoriteImage}
            height="100"
            className="rounded-full"
            alt="favorite image tag"
          />
          </div>}
        <CoverImage title={title} url={coverImage} slug={slug} />
        <div className="album-info">
          <div className="album-details">
            <div className="album-details-text">
              <Link href={`/posts/${slug}`}>
                <h4 className="album-title">{title} ({yearReleased})</h4>
              </Link>
              <ul className="music-labels">
                <li className="category">{type}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}