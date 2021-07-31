import React from "react"
import { graphql } from "gatsby"
import LayoutAntd from "../../components/LayoutAntd"
import Seo from "../../components/Seo"
import FeaturedMedia from "../../components/FeaturedMedia"

const page = ({ data }) => {
  const { page } = data
  const { title, content, featuredImage, excerpt, databaseId, uri } = page

  return (
    <LayoutAntd
        className="page"
    >
      <Seo title={title} description={excerpt} socialImage={featuredImage?.node} uri={uri} />

      <article
        className={`post-${databaseId} post page type-page status-publish hentry`}
        id={`post-${databaseId}`}
      >
        <header className="entry-header has-text-align-center header-footer-group">
          <div className="entry-header-inner section-inner medium">
            <h1
              className="entry-title"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
        </header>

        <FeaturedMedia image={featuredImage} />

        <div className="post-inner thin">
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </article>
    </LayoutAntd>
  )
}

export const query = graphql`
  query page($id: String!, $nextPage: String, $previousPage: String) {
    page: wpPage(id: { eq: $id }) {
      ...PageContent
    }
    nextPage: wpPage(id: { eq: $nextPage }) {
      title
      uri
    }
    previousPage: wpPage(id: { eq: $previousPage }) {
      title
      uri
    }
  }
`

export default page;
