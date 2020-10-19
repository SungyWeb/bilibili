import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import Page from './Page'
import './style/index.less'
import './style/antd/index.less'
import './style/lib/animate.css'

ReactDOM.render(
  <Page />,
  document.getElementById('root')
)

serviceWorker.register()