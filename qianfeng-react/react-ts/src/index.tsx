import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.less'
import zhCN from 'antd/es/locale/zh_CN'
import {ConfigProvider} from 'antd'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRoutes } from './routes'

render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route path="/admin" render={routerProps => {
          // todo: 权限认证
          return <App {...routerProps}/>
        }}></Route>
        {
          mainRoutes.map(item => {
            return (
              <Route key={item.pathname} path={item.pathname} component={item.component}></Route>
            )
          })
        }
        <Redirect to="/admin" from="/" exact />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </ConfigProvider>
  , document.querySelector('#root'));