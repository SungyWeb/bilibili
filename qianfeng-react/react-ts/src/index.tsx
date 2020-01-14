import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.less'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRouter } from './routes'

render(
  <Router>
    <Switch>
      <Route path="/admin" render={routerProps => {
        // todo: 权限认证
        return <App />
      }}></Route>
      {
        mainRouter.map(item => {
          return (
            <Route key={item.pathname} path={item.pathname} component={item.component}></Route>
          )
        })
      }
      <Redirect to="/admin" from="/" exact />
      <Redirect to="/404" />
    </Switch>
  </Router>
  , document.querySelector('#root'));