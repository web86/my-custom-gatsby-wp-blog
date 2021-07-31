import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { main } from '../assets/main.less'
import { Row, Col } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, RightOutlined } from '@ant-design/icons'
import UniversalLink from "./UniversalLink"
import Header from "./Header"
import MenuModal from "./MenuModal"

const Layout = ({ children }) => {
    const [backdropActive, setBackdropActive] = useState(false)
    const backdropClasses = " backdrop"
    const toggleBackdrop = (e, active) => {
        e.preventDefault()
        setBackdropActive(active)
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
                                <div className="widget-header">Навигация по статье:</div>
                                <ul className="categories">
                                    <li>test</li>
                                    <li>test</li>
                                    <li>test</li>
                                    <li>test</li>
                                    <li>test</li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                    <div className="footermenu">
                        <span>Работаю с:</span> HTML, CSS, LESS, JS, Jquery, React, Redux, Gatsby, GraphQl, PHP, WP, Joomla, Opencart
                    </div>
                </div>

                <div style={{padding: "24px"}}>© {new Date().getFullYear()}{" "}Блог айтишника-фрилансера</div>
            </div>
        </div>
    )
}

export default Layout