import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import UniversalLink from "./UniversalLink"
import { DownOutlined } from '@ant-design/icons';

const Menu = () => {
  const { wpMenu } = useStaticQuery(graphql`
    {
      wpMenu(slug: { eq: "primary" }) {
        name
        menuItems {
          nodes {
            label
            url
            databaseId
            id
            parentId
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

  // convert flat list menu to hierarhical menu
  const treeify = (arr) => {
    const tree = [];
    const lookup = {};
    // create new obj and push there all items with new array "children"
    arr.forEach((o) => {
      lookup[o.id] = o;
      lookup[o.id].children = [];
    });
    // if item has parentId then push this item in created new obj to parent's children array
    arr.forEach((o) => {
      if (o.parentId !== null) {
        lookup[o.parentId].children.push(o);
      } else {
        tree.push(o);
      }
    });
    return tree;
  };

  if (!wpMenu?.menuItems?.nodes || wpMenu.menuItems.nodes === 0) return null

  const hierarchicalList = treeify( wpMenu.menuItems.nodes )

  return (
    <nav
      className="primary-menu-wrapper"
      aria-label="Horizontal"
      role="navigation"
    >
      <ul className="primary-menu reset-list-style" >
        {hierarchicalList.map((menuItem, i) => {
          const path = menuItem?.connectedNode?.node?.uri ?? menuItem.url

          const itemId = "menu-item-" + menuItem.databaseId
          const parentClass = menuItem.children.length ? " parent" : ""
          return (
            <li
              key={menuItem.id}
              className={
                "menu-item " +
                itemId +
                parentClass
              }
            >
              {
                (menuItem.children.length)
                  ?
                  <>
                    <UniversalLink to={path} activeClassName={"current-menu-item current_page_item"} className={"dropdown-link"}>
                      {menuItem.label} <DownOutlined />
                    </UniversalLink>
                    <ul className="dropdown-menu">
                      {menuItem.children.map((subItem) => {
                        return (
                            <li key={subItem.id}>
                              <UniversalLink to={subItem.url} activeClassName={"current-menu-item current_page_item"}>
                                {subItem.label}
                              </UniversalLink>
                            </li>
                        )
                      })}
                    </ul>
                  </>
                    :
                    <UniversalLink to={path} activeClassName={"current-menu-item current_page_item"}>
                      {menuItem.label}
                    </UniversalLink>
              }

            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Menu
