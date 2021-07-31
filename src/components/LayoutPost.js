import React, { useState } from "react"

import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

import Header from "./Header"
import FooterMenusWidgets from "./FooterMenusWidgets"


const LayoutPost = ({ children, bodyClass }) => {


    return (
        <Layout style={{ maxWidth:'1200px', margin: '0 auto',}}>

            <Header />

            <Content>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Row>
                        <Col xs={24} lg={18}>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <main id="site-content" role="main">
                                    {children}
                                </main>
                                <FooterMenusWidgets />
                            </Content>
                        </Col>
                        <Col xs={24} lg={6}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>

                        </Col>
                    </Row>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default LayoutPost
