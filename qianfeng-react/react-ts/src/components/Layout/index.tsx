import React, { Component } from 'react'
import { Layout as Lay, Menu, Breadcrumb } from 'antd';
import Logo from './logo.png'
import './index.less'
import { adminRoutes } from '../../routes'

const { Header, Content, Sider } = Lay;
const menus = adminRoutes.filter(route => route.isNav)

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Lay>
          <Header className="header app-header">
            <div className="logo">
              <img src={Logo} alt="logo" />
              {/* <span>SuperFleet 车队管理系统</span> */}
            </div>
            <Menu
              mode="horizontal"
              className="app-menu"
            >
              {
                menus.map(menu => {
                  return <Menu.Item key={menu.pathname}>{menu.title}</Menu.Item>
                })
              }
            </Menu>
          </Header>
          <Lay>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </Menu>
            </Sider>
            <Lay style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                {this.props.children}
              </Content>
            </Lay>
          </Lay>
        </Lay>,
      </div>
    )
  }
}
