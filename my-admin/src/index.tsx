import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import Page from './Page'
const GlobalContext = createContext({})

ReactDOM.render(
  <GlobalContext.Provider value={{}}>
    <Page />
  </GlobalContext.Provider>,
  document.getElementById('root')
)

serviceWorker.register()