import React from 'react';
import MenuConfig from '../../router/config';
import {Menu} from 'antd';
import Logo from './img/logo.png';
import "./index.less";
const {SubMenu} = Menu;

export default class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTree: null,
    }
  }
  componentDidMount() {
    const tree = this.renderMenu(MenuConfig);
    this.setState({
      menuTree: tree
    });
  }
  renderMenu = (data) => {
    return data.map(item => {
      if(item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key} title={item.title}>{item.title}</Menu.Item>
      )
    })
  }
  render() {
    return (
      <div>
        <div className="logo-box">
          <img className="logo" src={Logo} alt="logo"></img>
        </div>
        <Menu theme="dark">
          {this.state.menuTree}
        </Menu>
      </div>
    )
  }
}