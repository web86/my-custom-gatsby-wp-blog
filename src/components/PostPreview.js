import React from "react"
import { Link } from "gatsby"
import PostMeta from "./PostMeta"
import FeaturedMedia from "./FeaturedMedia"
import { SwapRightOutlined } from "@ant-design/icons"

const PostPreview = ({ post, isLast }) => {
  //console.log(post)
  return (
    <>
      <article
        className={`post-${post.databaseId} post-preview`}
        id={`post-${post.databaseId}`}
      >
        <header className="entry-header">
          <div className="entry-header-inner">

            <h2 className="entry-title ">
              <Link
                to={post.uri}
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
            </h2>

            <PostMeta
              title={post.title}
              author={post.author}
              date={post.date}
              categories={post.categories}
            />
          </div>
        </header>
        <Link to={post.uri}>
          <FeaturedMedia image={post.featuredImage} />
        </Link>
        <div className="post-inner thin ">
          <div className="entry-content">
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <p>
              <Link to={post.uri} className="more">
                Читать полностью <SwapRightOutlined />
              </Link>
            </p>
          </div>
        </div>

      </article>

    </>
  )
}

export default PostPreview
