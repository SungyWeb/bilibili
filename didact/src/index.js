import React, { useState } from 'react'
import ReactDOM from 'react-dom'
// function Counter() {
//     const [state, setState] = useState(0)
//     return (
//         <h1 onClick={() => setState(c => c+1)}>
//             Counter: {state}
//         </h1>
//     )
// }
class Counter extends React.Component {
    clickHandle = () => {
        alert(1)
    }
    render () {
        return <button onClick={this.clickHandle}>click</button>
    }
}
const element = <Counter />
console.dir(element)
ReactDOM.render(element, document.getElementById('root'))
