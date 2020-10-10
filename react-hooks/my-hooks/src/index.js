// import React from 'react'
// import ReactDOM from 'react-dom'
import React from './lib/my-react'
import ReactDOM from './lib/my-react/react-dom'
const style = {
  border: '1px solid red',
  margin: '5px',
}
let element = (
  <div id="A1" style={style}>
    A1
    <div id="B1" style={style}>
      B1
      <div id="C1" style={style}>c1</div>
      <div id="C2" style={style}>c2</div>
    </div>
    <div id="B2" style={style}>B2</div>
  </div>
)
ReactDOM.render(
  element,
  document.getElementById('root')
)

