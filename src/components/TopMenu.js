import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Menu } from 'antd';
import UniversalLink from "./UniversalLink"

const TopMenu = () => {
    const { wpMenu } = useStaticQuery(graphql`
        {
            wpMenu(slug: { eq: "primary" }) {
                name
                menuItems {
                    nodes {
                        label
                        url
                        databaseId
                        connectedNode {
                            node {
                                ... on WpContentNode {
                                    uri
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    if (!wpMenu?.menuItems?.nodes || wpMenu.menuItems.nodes === 0) return null

    return (

        <Menu theme="dark" mode="horizontal" >
                {wpMenu.menuItems.nodes.map((menuItem, i) => {
                    const path = menuItem?.connectedNode?.node?.uri ?? menuItem.url

                    const itemId = "menu-item-" + menuItem.databaseId

                    return (

                            <UniversalLink
                                to={path}
                                activeClassName={"ant-menu-item-selected"}
                            >
                                {menuItem.label}
                            </UniversalLink>


                    )
                })}
        </Menu>
    )
}

export default TopMenu
