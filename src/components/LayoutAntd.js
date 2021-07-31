import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { main } from '../assets/main.less'
import { Row, Col } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, RightOutlined } from '@ant-design/icons'
import UniversalLink from "./UniversalLink"
import Header from "./Header"
import MenuModal from "./MenuModal"

const LayoutAntd = ({ children }) => {
    const [backdropActive, setBackdropActive] = useState(false)
    const backdropClasses = " backdrop"
    const toggleBackdrop = (e, active) => {
        e.preventDefault()
        setBackdropActive(active)
    }

    const { allWpCategory } = useStaticQuery(graphql`
        {
            allWpCategory {
                nodes {
                    name
                    uri
                    databaseId
                }
            }
        }
    `)

    // console.log(allWpCategory.nodes)
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
                                <div className="widget-header">Рубрики</div>
                                <ul className="categories">
                                    {allWpCategory.nodes.map(item=>{
                                        return (
                                            <li key={item.databaseId}>
                                                <UniversalLink to={item.uri} activeClassName={"current-menu-item current_page_item"}>
                                                    <RightOutlined className="gray-arr-right"/> {item.name}
                                                </UniversalLink>
                                            </li>
                                        )
                                    })}
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

export default LayoutAntd


