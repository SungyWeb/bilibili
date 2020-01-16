import Loadable from 'react-loadable'
import { Loading } from '../components'

/* import ArticleList from './Article'
import ArticleEdit from './Article/Edit'
import Dashboard from './Dashboard'
import Login from './Login'
import NotFound from './NotFound'
import Settings from './Settings' */

function getLoadableComponent(path: string, loadingComponent: React.FC = Loading): React.ComponentType {
  return Loadable({
    loader: () => import(`${path}`),
    loading: loadingComponent
  })
}

const ArticleList  = getLoadableComponent('./Article');
const ArticleEdit  = getLoadableComponent('./Article/Edit');
const NotFound  = getLoadableComponent('./NotFound');
const Dashboard  = getLoadableComponent('./Dashboard');
const Login  = getLoadableComponent('./Login');
const Settings  = getLoadableComponent('./Settings');


export {
  ArticleList,
  ArticleEdit,
  NotFound,
  Dashboard,
  Login,
  Settings
}