const MEDIA_GRAPHQL_FIELDS = `
title
slug
poster {
  url
  description
}
yearReleased
type
attendeeName
attendeeCompany
`

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ['posts'] },
    }
  ).then((response) => response.json())
}

function extractMediaPost(fetchResponse: any): any {
  return fetchResponse?.data?.mediaCollection?.items?.[0]
}

function extractMediaPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.mediaCollection?.items
}

export async function getPreviewMediaPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      mediaCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${MEDIA_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractMediaPost(entry)
}

export async function getAllMediaPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      mediaCollection(order: title_ASC, where: { slug_exists: true }, preview: ${
        isDraftMode ? 'true' : 'false'
      }) {
        items {
          ${MEDIA_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  )
  return extractMediaPostEntries(entries)
}

export async function getPostAndMoreMediaPosts(
  slug: string,
  preview: boolean
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      mediaCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 3) {
        items {
          ${MEDIA_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      mediaCollection(where: { slug_not_in: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 3) {
        items {
          ${MEDIA_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    post: extractMediaPost(entry),
    morePosts: extractMediaPostEntries(entries),
  }
}
