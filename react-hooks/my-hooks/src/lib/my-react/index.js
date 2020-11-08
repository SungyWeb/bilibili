import { ELEMENT_TEXT } from './enums'
import { scheduleRoot } from './schedule'
import { Update, UpdateQueue } from './update-quene'
function createElement(type, config, ...children) {
  return {
    type,
    props: {
      ...config,
      children: children.map(v => {
        return typeof v === 'object' ? v : { type: ELEMENT_TEXT, props: { text: v, children: [] } }
      })
    },

  }
}
class Component {
  constructor(props) {
    this.props = props
    this.updateQueue = new UpdateQueue()
  }
  setState(payload) {
    let update = new Update(payload)
    this.internalFiber.updateQueue.enqueueUpdate(update)
    scheduleRoot()
  }
}
Component.prototype.isReactComponent = {
}

export default {
  createElement,
}