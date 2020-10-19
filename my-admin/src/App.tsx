import React, { createContext, useContext, useState } from 'react'
import { Button, Layout } from 'antd'
import { checkLogin } from './units'
import SiderCustom from './Components/SiderCustom'

const GlobalContextDefault = {
  auth: {
    permission: null,
  },
  responsive: {
    isMobile: false,
  },
  ligth: true,
}

export const GlobalContext = createContext(GlobalContextDefault)

export default function App() {
  const [global, setGlobal] = useState(GlobalContextDefault)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  return (
    <GlobalContext.Provider value={global}>
      <Layout>
      {
        !global.responsive.isMobile && checkLogin(global.auth.permission) && (
          <SiderCustom collapsed={collapsed} />
        )
      }
    </Layout>
    </GlobalContext.Provider>
  )
}
