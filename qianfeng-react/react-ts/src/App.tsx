import React, { Component } from 'react'
import { adminRoutes } from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from './components'

const menus = adminRoutes.filter(route => route.isNav)

export default class App extends Component {
  render() {
    return (
      <Layout menus={menus}>
        <div>
          <h1>公共部分</h1>
          <Switch>
            {
              adminRoutes.map(item => {
                return (
                  <Route
                    key={item.pathname}
                    path={item.pathname}
                    exact={item.exact || false}
                    render={routeProps => {
                      return <item.component {...routeProps} />
                    }
                    } />
                )
              })
            }
            <Redirect to="/admin/dashboard" from="/admin" exact />
            <Redirect to="/404" />
          </Switch>
        </div>
      </Layout>
    )
  }
}
