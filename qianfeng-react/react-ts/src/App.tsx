import React, { Component } from 'react'
import { Button } from 'antd'

const tsc = (WarppedComponent: typeof Component) => {
  return class HOCComponent extends Component {
    render() {
      return (
        (
          <>
            <WarppedComponent></WarppedComponent>
            <h3>测试装饰器</h3>
          </>
        )
      )
    }
  }
}

@tsc
export default class App extends Component {
  render() {
    return (
      <div>
        App
        <Button type="primary">ok</Button>
      </div>
    )
  }
}
