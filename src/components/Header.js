import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { Layout } from 'antd'
import Logo from "../assets/images/logo.jpg"
import Menu from "./Menu"
import { header } from '../assets/main.less'
import ToggleIcon from "../assets/svg/toggle.inline.svg"

const { Header : AntdHeader } = Layout

const Header = ({ pageContext, toggleBackdrop, ...props }) => {
  const { wp } = useStaticQuery(graphql`
    {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)
  return (
    <header id="site-header" className="header"  role="banner">
          <div className="header-titles">
              <div className="left">
                <Link to="/" className="logotip">
                    <img src={Logo} alt={wp.generalSettings.title }/>
                </Link>
                <div className="site-branding-container">
                    <div className="site-title">
                        <Link
                            to="/"
                            dangerouslySetInnerHTML={{ __html: wp.generalSettings.title }}
                        />
                    </div>
                    <div
                        className="site-description"
                        dangerouslySetInnerHTML={{
                            __html: wp.generalSettings.description,
                        }}
                    />
                </div>
              </div>

              <button
                  className="toggle nav-toggle desktop-nav-toggle"
                  data-toggle-target=".menu-modal"
                  data-toggle-body-class="showing-menu-modal"
                  aria-expanded="false"
                  data-set-focus=".close-nav-toggle"
                  onClick={(e) => toggleBackdrop(e, true)}
              >
                <span className="toggle-inner">
                  <span className="toggle-text">Menu</span>
                  <span className="toggle-icon">
                    <ToggleIcon />
                  </span>
                </span>
              </button>
          </div>
          <AntdHeader className="header">
               <Menu/>
          </AntdHeader>
    </header>
  )
}

export default Header
