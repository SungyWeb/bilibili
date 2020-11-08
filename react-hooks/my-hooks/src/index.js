// import React from 'react'
// import ReactDOM from 'react-dom'
import React from './lib/my-react'
import ReactDOM from './lib/my-react/react-dom'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.clickHandle.bind(this)
  }
  clickHandle() {
    console.log(1)
  }
  render() {
    return (
      <div>
        <h3>{ this.state.count }</h3>
        <div>
          <button onClick={ this.clickHandle }>click</button>
        </div>
      </div>
    )
  }
}