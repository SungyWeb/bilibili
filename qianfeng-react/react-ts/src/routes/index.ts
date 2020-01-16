import {
  ArticleList,
  ArticleEdit,
  NotFound,
  Dashboard,
  Login,
  Settings
} from '../views'
import { RouteProps } from 'react-router-dom'

type Routes = {
  pathname: string,
  component: React.ComponentType<RouteProps>,
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

export const adminRouter: Routes = [
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