import React from "react"
import { Link } from "gatsby"
import { SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons'

const ContentTypePagination = ({ previousPage, nextPage, contentType }) => {

  return (
    <nav
      className="pagination-single section-inner"
      aria-label={contentType}
      role="navigation"
    >
        {previousPage && (
          <Link className="previous-post" to={previousPage.uri}>
            <span className="arrow" aria-hidden="true">
              <SwapLeftOutlined/>{' '}
            </span>
            <span className="title">
              <span
                className="title-inner"
                dangerouslySetInnerHTML={{ __html: previousPage.title }}
              />
            </span>
          </Link>
        )}

        {nextPage && (
          <Link className="next-post" to={nextPage.uri}>
            <span className="title">
              <span
                className="title-inner"
                dangerouslySetInnerHTML={{ __html: nextPage.title }}
              />
            </span>
            <span className="arrow" aria-hidden="true">
              {' '}<SwapRightOutlined/>
            </span>
          </Link>
        )}

    </nav>
  )
}

export default ContentTypePagination
