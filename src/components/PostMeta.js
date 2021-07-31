import React from "react"
import AuthorIcon from "../assets/svg/author.inline.svg"
import { Link } from "gatsby"
import DateIcon from "../assets/svg/date.inline.svg"
import CommentIcon from "../assets/svg/comment.inline.svg"
import PostCategories from "./PostCategories"
import { EyeOutlined } from '@ant-design/icons'

const PostMeta = ({ author, title, date, categories }) => {
  author = author?.node
  return (
    <div className="post-meta-wrapper">
      <ul className="post-meta">
        <li className="post-date meta-wrapper">
          <span className="meta-icon">
            <DateIcon />
          </span>
          <span className="meta-text">{date}</span>
        </li>
        <li className="post-author meta-wrapper">
          <span className="meta-icon">
            <AuthorIcon />
          </span>
          <span className="meta-text">
            Автор{" "}
            <Link to="/contactus/">
              {author.firstName
                ? author.lastName
                  ? author.firstName + " " + author.lastName
                  : author.firstName
                : author.name}
            </Link>
          </span>
        </li>
        <li className="post-categs">
          <PostCategories categories={categories}/>
        </li>
        <li className="post-comment-link meta-wrapper">
          <span className="meta-icon">
            <EyeOutlined />
          </span>
          <span className="meta-text">
              1882 просмотров
          </span>
        </li>
      </ul>
    </div>
  )
}

export default PostMeta
