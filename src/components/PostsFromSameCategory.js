import React from "react"
import { Link } from "gatsby"
import PostMeta from "./PostMeta"
import PostCategories from "./PostCategories"
import FeaturedMedia from "./FeaturedMedia"
import { SwapRightOutlined } from "@ant-design/icons"

const PostFromSameCategory = ({posts}) => {
    // category:wp
    // posts []
    // console.log(posts);
    return (
        <div className="related-posts">
            <h3>
                Новое из этой же категории:
            </h3>
        {posts.nodes &&
            posts.nodes.map(post => {

            return (
                <div
                    className={`post-from-same-category`}
                    key={post.slug}
                >
                    <header className="entry-header">
                        <div className="entry-header-inner">
                            <p>
                                {post.date}
                            </p>
                        </div>
                    </header>
                    <Link to={post.uri}>
                        <FeaturedMedia image={post.featuredImage} />
                    </Link>
                    <div className="post-inner thin ">
                        <h3 className="entry-title">
                            <Link
                                to={post.uri}
                                dangerouslySetInnerHTML={{ __html: post.title }}
                            />
                        </h3>
                        <div className="entry-content">
                            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                            <Link to={post.uri}>Подробнее <SwapRightOutlined/></Link>
                        </div>
                    </div>
                </div>
            )
        })}
        </div>
    )
}

export default PostFromSameCategory
