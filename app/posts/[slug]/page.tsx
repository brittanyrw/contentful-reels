import Link from 'next/link'
import { draftMode } from 'next/headers'

import Medias from '../../medias'
import PostHeader from '../../post-header'

import { getAllMediaPosts, getPostAndMoreMediaPosts } from '@/lib/api'

export async function generateStaticParams() {
  const allPosts = await getAllMediaPosts(false)

  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { isEnabled } = draftMode()
  const { post, morePosts } = await getPostAndMoreMediaPosts(params.slug, isEnabled)

  return (
    <div className="page">
      <section className="page-header">
          <h2>
            <Link href="/">
              <p className="header-link">Back to Home</p>
            </Link>
          </h2>
        </section>
        <section className="page-content">
            <article>
              <div className="page-title-section">
                <title>
                  {post.title}
                </title>
                <meta property="og:image" content={post.poster.url} />
              </div>
              <PostHeader
                title={post.title}
                coverImage={post.poster.url}
                attendeeName={post.attendeeName}
                yearReleased={post.yearReleased}
                type={post.type}
                genres={post.genres}
              />
            </article>
            <hr />
            {morePosts && morePosts.length > 0 && (
              <Medias posts={morePosts} />
            )}
            <section />
          </section>
    </div>
  )
}
