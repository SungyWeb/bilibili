import Didact from './lib/didact'
import DidactDOM, { useState } from './lib/didact-dom'

/** @jsxRuntime classic */
/** @jsx Didact.createElement */
function Counter() {
    const [state, setState] = useState(0)
    return (
        <h1 onClick={() => setState(c => c+1)}>
            Counter: {state}
        </h1>
    )
}

// function App (props) {
//     return <h1>Hi, {props.name}</h1>
// }
// const element = <App name="foo" />

// const element = (
//     <div id="foo">
//         <a href="www.baidu.com" target="_blank">a</a>
//         <br/>
//         <span>asdf</span>
//     </div>
// )
DidactDOM.render(<Counter />, document.getElementById('root'))
