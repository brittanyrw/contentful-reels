import CoverImage from './cover-image'


export default function PostHeader({ title, coverImage, attendeeName, yearReleased, type } : {
  title: string
  coverImage: string
  attendeeName: string,
  yearReleased: number,
  type: string
}) {
  return (
    <>
      <div className="album-page-header">
        <CoverImage title={title} url={coverImage} />
        <div className="album-page-info">
          <h1>{title} ({yearReleased})</h1>
          <p className="album-page-subtitle">Added by: {attendeeName}</p>
          <ul className="music-labels">
            <li className="category">{type}</li>
          </ul>
        </div>
      </div>
    </>
  )
}
