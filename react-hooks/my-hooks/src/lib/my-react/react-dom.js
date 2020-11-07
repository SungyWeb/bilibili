import { TAG_ROOT, TAG_HOST, TAG_TEXT } from './enums'
import { scheduleRoot } from './schedule'
function render(element, container) {
  const rootFiber = {
    tag: TAG_ROOT,
    stateNode: container,     // 如果是原生节点， stateNode 指向真实dom元素
    props: {
      children: [element],  // children 中存放vdom
    }
  }
  scheduleRoot(rootFiber)
}
export default {
  render,
}