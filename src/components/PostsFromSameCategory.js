import React from "react"
import { Link } from "gatsby"
import PostMeta from "./PostMeta"
import PostCategories from "./PostCategories"
import FeaturedMedia from "./FeaturedMedia"

const PostFromSameCategory = ({category, posts}) => {
    // category:wp
    // posts []
    // console.log(posts);
    return (
        <>
        {posts.nodes &&
            posts.nodes.map(post => {
            return (
                <div
                    className={`post type-post status-publish format-standard has-post-thumbnail hentry category-uncategorized`}
                    key={post.slug}
                >
                    <header className="entry-header has-text-align-center">
                        <div className="entry-header-inner section-inner medium">
                            <h3 className="entry-title heading-size-1">
                                <Link
                                    to={`/${category}${post.uri}`}
                                    dangerouslySetInnerHTML={{ __html: post.title }}
                                />
                            </h3>
                            <p>
                                {post.date}
                            </p>
                        </div>
                    </header>

                    <FeaturedMedia image={post.featuredImage} />

                    <div className="post-inner thin ">
                        <div className="entry-content">
                            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                        </div>
                    </div>
                </div>
            )
        })}
        </>
    )
}

export default PostFromSameCategory
