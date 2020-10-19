import { Slider } from 'antd'
import React from 'react'
import { Layout } from 'antd'

type SiderProps = {
  collapsed: boolean,
}
const { Sider } = Layout
export default function SiderCustom({collapsed}: SiderProps) {
  return (
    <Sider
      trigger={null}
      breakpoint="lg"
      collapsed={collapsed}
      style={{overflowY: 'auto'}}
      className="sider-custom"
    >
      <div className="logo" />
      <SiderMenu

      />
      <style>
        {
          `
          #nprogress .spinner{
            left: ${collapsed ? '70px' : '206px'};
            right: 0 !important;
          }
          `
        }
      </style>
    </Sider>
  )
}
