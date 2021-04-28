import DidactDOM from './Didact/didact-dom'
import Didact from './Didact/didact'

/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const App = <h3 id="h3" onClick={() => console.log('asdf')}>
  <p>hello</p>
  <p>world</p>
</h3>

DidactDOM.render(App, document.getElementById('root'))