import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import NotFound from './Components/Pages/NotFound'
import Login from './Components/Pages/Login'
import App from './App'
export default function Page() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
        <Route path="/app" component={App} />
        <Route path="404" component={NotFound} />
        <Route path="/login" component={Login} />
      </Switch>
    </HashRouter>
  )
}
