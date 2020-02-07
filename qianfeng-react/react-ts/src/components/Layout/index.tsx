import React, { Component } from 'react'
import { Layout as Lay, Menu, Icon } from 'antd';
import Logo from './logo.png'
import './index.less'
import { Routes } from '../../routes'
import { ClickParam } from 'antd/lib/menu';
import { withRouter, RouteComponentProps } from 'react-router-dom'

const { Header, Content, Sider } = Lay;

// type IProps = RouteComponentProps & {
//   menus: Routes
// }
interface IProps extends RouteComponentProps {
  menus: Routes
}

class Layout extends Component<IProps> {

  menuClick = ({key}: ClickParam): void => {
    this.props.history.push(key)
  }
  render() {
    const p = this.props.location.pathname
    return (      
        <Lay style={{minHeight: '100%'}}>
          <Header className="header app-header">
            <div className="logo">
              <img src={Logo} alt="logo" />
              {/* <span>SuperFleet 车队管理系统</span> */}
            </div>
            <Menu
              mode="horizontal"
              className="app-menu"
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </Menu>
          </Header>
          <Lay>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                selectedKeys={[p]}
                style={{ height: '100%', borderRight: 0 }}
                onClick={this.menuClick}
              >
                {
                  this.props.menus.map((menu) => {
                    return (
                      <Menu.Item key={menu.pathname}>
                        <Icon type={menu.icon} />
                        {menu.title}
                      </Menu.Item>
                    )
                  })
                }
              </Menu>
            </Sider>
            <Lay style={{ padding: '0 24px 24px' }}>
              <Content
                style={{
                  background: '#fff',
                  padding: 16,
                  minHeight: 280,
                }}
              >
                {this.props.children}
              </Content>
            </Lay>
          </Lay>
        </Lay>
    )
  }
}
export default withRouter(Layout)