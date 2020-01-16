
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
  title?: string,
  isNav?: boolean,
}[]

export const mainRoutes: Routes = [
  {
    pathname: '/login',
    component: Login
  },
  {
    pathname: '/404',
    component: NotFound
  }
]

export const adminRoutes: Routes = [
  {
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    isNav: true,
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    isNav: true,
    exact: true
  },
  {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章编辑',
    isNav: true,
  },
  {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    isNav: true,
  },
]