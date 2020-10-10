import { TAG_ROOT, } from './constants'
import { scheduleRoot } from './schedule'
/*
  type Fiber = {
    tag,  // 元素的类型
    stateNode, // element为原生节点，stateNode指向真实dom元素
    props: {
      children: [],   // 该节点将要渲染的React元素（即虚拟dom，不是fiber）
    }
  }
*/

/**
 * 将一个节点渲染到容器内
 * @param {jsx} element 节点
 * @param {} container 容器
 */
function render(element, container) {
  // 每个节点都会创建一个fiber
  const rootFiber = {
    tag: TAG_ROOT,
    stateNode: container,
    props: {
      children: [element],
    }
  }
  scheduleRoot(rootFiber)
}

const ReactDom = {
  render,
}

export default ReactDom
