import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"

// import Comments from "../../components/Comments"
import ContentTypePagination from "../../components/ContentTypePagination"
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


  // const customCrumbLabel = location.pathname.toLowerCase().replace('-', ' ')

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: post.uri },
  }

  // находим начало и конец виджета навигации
  const start = content.indexOf('<!--noindex--><div>')
  const finish = content.lastIndexOf('<!--/noindex-->')
  // выризаем из статьи блок виджета
  const oglavlenie = content.substr(start, finish)
  // парсим строку и вытасикваем из нее название и ссылку
  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(oglavlenie, "text/html");
  let aTags = parsedHtml.getElementsByTagName("a");
  let vocab = [];
  for (let a of aTags) {
    const title = a.getElementsByTagName('span')[0].innerHTML;
    // const href = a.getAttribute("href");
    const href = a.getAttribute("href").substring(1);
    // складываем в массив
    vocab.push( { title, href } )
  }

  return (
    <Layout content={ vocab }
        className="post"
    >
      <Seo title={title} description={excerpt} socialImage={featuredImage?.node} uri={uri} />

      <article
        className={`post-${databaseId} post`}
        id={`post-${databaseId}`}
      >
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <div className="breadcrumb__list">
          <Link to="/">Главная</Link>
          <span className="breadcrumb__separator">/</span>
          <Link to={`/${categories.nodes[0].slug}`}>{categories.nodes[0].name}</Link>
          <span className="breadcrumb__separator">/</span>
          <span>{title}</span>
        </div>
        </nav>

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

        <div className="section-inner">
          <ContentTypePagination
            previousPage={previousPage}
            nextPage={nextPage}
            contentType={"Post"}
          />
          <DiscussionEmbed {...disqusConfig} />
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
