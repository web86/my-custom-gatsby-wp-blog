import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import Comments from "../../components/Comments"
import ContentTypePagination from "../../components/ContentTypePagination"
import AuthorBio from "../../components/AuthorBio"
import PostMeta from "../../components/PostMeta"
import PostCategories from "../../components/PostCategories"
import FeaturedMedia from "../../components/FeaturedMedia"
import PostFromSameCategory from "../../components/PostsFromSameCategory"
import { DiscussionEmbed } from "disqus-react"

const post = (props) => {
   // console.log(props)
  const { nextPage, previousPage, page, relatedPosts } = props.data
  const {
    title,
    uri,
    content,
    featuredImage,
    categories,
    excerpt,
    databaseId,
    author,
    date,
  } = page

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: post.uri },
  }

  return (
    <Layout
      bodyClass={`post-template-default single single-post postid-${databaseId} single-format-standard wp-embed-responsive singular has-post-thumbnail has-single-pagination showing-comments footer-top-visible customize-support`}
    >
      <Seo title={title} description={excerpt} socialImage={featuredImage?.node} uri={uri} />

      <article
        className={`post-${databaseId} post type-post status-publish format-standard has-post-thumbnail hentry category-uncategorized`}
        id={`post-${databaseId}`}
      >
        <header className="entry-header has-text-align-center header-footer-group">
          <div className="entry-header-inner section-inner medium">
            <PostCategories categories={categories} />
            <h1
              className="entry-title"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div
              className="intro-text section-inner max-percentage small"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
            <PostMeta title={title} author={author} date={date} />
          </div>
        </header>

        <FeaturedMedia image={featuredImage} />

        <div className="post-inner thin">
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <DiscussionEmbed {...disqusConfig} />
        <div className="section-inner">
          <AuthorBio author={author} />
          <ContentTypePagination
            previousPage={previousPage}
            nextPage={nextPage}
            contentType={"Post"}

          />
          <PostFromSameCategory posts={relatedPosts}/>



        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query post($id: String!, $nextPage: String, $previousPage: String, $mainCategory : String) {
    page: wpPost(id: { eq: $id }) {
      ...PostContent
    }
    nextPage: wpPost(id: { eq: $nextPage }) {
      title
      uri
      categories {
        nodes {
          slug
        }
      }
    }
    previousPage: wpPost(id: { eq: $previousPage }) {
      title
      uri
      categories {
        nodes {
          slug
        }
      }
    }
    relatedPosts: allWpPost(
      filter: {categories: {nodes: {elemMatch: {slug: {eq: $mainCategory}}}}, id: {ne: $id}}
      limit: 4
    ) {
      nodes {
        uri
        title
        slug
        date(formatString: "LL")
        excerpt
        featuredImage {
          node {
            altText
            localFile {
              ...HeroImage
              publicURL
            }
            
          }
        }
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }
`

export default post;
