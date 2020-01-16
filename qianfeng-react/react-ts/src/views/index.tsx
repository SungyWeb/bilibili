import Loadable, { LoadableComponent } from 'react-loadable'
import { Loading } from '../components'

/* import ArticleList from './Article'
import ArticleEdit from './Article/Edit'
import Dashboard from './Dashboard'
import Login from './Login'
import NotFound from './NotFound'
import Settings from './Settings' */

const ArticleList: React.ReactNode  = Loadable({
  loader: () => import('./Article'),
  loading: Loading
})
const ArticleEdit: React.ReactNode = Loadable({
  loader: () => import('./Article/Edit'),
  loading: Loading
})
const NotFound: React.ReactNode = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const Dashboard: React.ReactNode = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
})
const Login: React.ReactNode = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})
const Settings: React.ReactNode = Loadable({
  loader: () => import('./Settings'),
  loading: Loading
})

export {
  ArticleList,
  ArticleEdit,
  NotFound,
  Dashboard,
  Login,
  Settings
}