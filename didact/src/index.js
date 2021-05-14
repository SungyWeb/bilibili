import React from 'react'
import ReactDOM from './DidactDOM/DidactDOM'
// import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    count: 1,
  }
  render () {

    return (
      <h3 id="h3" onClick={() => this.setState(s => ({count: s.count + 1}))}>
        <p>hello</p>
        <p>world</p>
        <p>{this.state.count}</p>
      </h3>
    )
  }
}
const ele = <App />
console.log(ele)
// ReactDOM.render(ele, document.getElementById('root'))
ReactDOM.render(ele, document.getElementById('root'))


