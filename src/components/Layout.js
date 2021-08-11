import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery} from "gatsby"
import { Link, animateScroll as scroll, scrollSpy } from "react-scroll"
import Sticky from 'react-sticky-el'
import { main } from '../assets/main.less'
import { Row, Col } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, RightOutlined } from '@ant-design/icons'

import UniversalLink from "./UniversalLink"
import Header from "./Header"
import MenuModal from "./MenuModal"

const Layout = ({ children, content }) => {
    const [backdropActive, setBackdropActive] = useState(false)
    const backdropClasses = " backdrop"
    const toggleBackdrop = (e, active) => {
        e.preventDefault()
        setBackdropActive(active)
    }
    const scrollToTop = () => {
        scroll.scrollToTop()
    }

    return (
        <div
            id={"GatsbyBody"}
            className={`showing-menu-modal showing-modal ${(backdropActive ? backdropClasses : "")}`}
        >
            <div className="maincontent" style={{ maxWidth:'1200px', margin: '0 auto'}}>

                <Header toggleBackdrop={toggleBackdrop}/>

                <MenuModal isActive={backdropActive} toggleBackdrop={toggleBackdrop} />

                <div className="main">
                    <div className="site-layout-background" style={{ padding: '24px 0', background: "#fff"}}>
                        <Row>
                            <Col xs={24} lg={18} className="leftsidebar">
                                <div style={{ padding: '0 24px', minHeight: 280 }}>
                                    <main id="site-content" role="main">
                                        {children}
                                    </main>

                                </div>
                            </Col>
                            <Col xs={24} lg={6} className="rightsidebar">
                                <Sticky>

                                    <div className="widget-header">Навигация по статье:</div>
                                    <ul className="sidebar-sticky-menu">
                                        {content.map(lnk => {
                                            return (
                                                <li key={lnk.href}>
                                                    <Link
                                                        activeClass="active"
                                                        to={lnk.href}
                                                        spy={true}
                                                        smooth="easeOutBack"
                                                        offset={-70}
                                                        duration={500}
                                                        hashSpy={true}
                                                    >
                                                        {lnk.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>



                                </Sticky>

                            </Col>
                        </Row>
                    </div>
                    <div className="footermenu">
                        <span>Работаю с:</span> HTML, CSS, LESS, JS, Jquery, React, Redux, Gatsby, GraphQl, PHP, WP, Joomla, Opencart, Github
                    </div>
                </div>

                <div style={{padding: "24px"}}>© {new Date().getFullYear()}{" "}Блог айтишника-фрилансера <a onClick={scrollToTop}>На верх</a></div>
            </div>
        </div>
    )
}

export default Layout