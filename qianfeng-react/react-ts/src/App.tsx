import React, { Component } from 'react'
import { adminRouter } from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>公共部分</h1>
        <Switch>
          {
            adminRouter.map(item => {
              return (
                <Route
                  key={item.pathname}
                  path={item.pathname}
                  exact={item.exact || false}
                  render={routeProps => {
                    console.log(routeProps)
                    return <item.component {...routeProps}/>
                  }
                }/>
              )
            })
          }
          <Redirect to="/admin/dashboard" from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </div>
    )
  }
}
