import {
  ArticleList,
  ArticleEdit,
  NotFound,
  Dashboard,
  Login,
  Settings
} from '../views'
import React from 'react'

type Routes = {
  pathname: string,
  component: typeof React.Component,
  exact?: boolean,
}[]

export const mainRouter: Routes = [
  {
    pathname: '/login',
    component: Login
  },
  {
    pathname: '/404',
    component: NotFound
  }
]

export const adminRouter = [
  {
    pathname: '/admin/dashboard',
    component: Dashboard
  },
  {
    pathname: '/admin/settings',
    component: Settings
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    exact: true
  },
  {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
  }
]