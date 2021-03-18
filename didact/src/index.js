import Didact from './lib/didact'
import DidactDOM from './lib/didact-dom'

/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const element = (
    <div id="foo">
        <a href="www.baidu.com" target="_blank">a</a>
        <br/>
        <span>asdf</span>
    </div>
)
DidactDOM.render(element, document.getElementById('root'))
