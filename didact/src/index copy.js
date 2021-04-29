import DidactDOM from './Didact/didact-dom'
import Didact from './Didact/didact'
import ReactDOM from 'react-dom'

// /** @jsxRuntime classic */
// /** @jsx Didact.createElement */
const App = <h3 id="h3" onClick={() => console.log(111)}>
  <p>hello</p>
  <p>world</p>
</h3>

ReactDOM.render(<App />, document.getElementById('root'))
// DidactDOM.render(App, document.getElementById('root'))

