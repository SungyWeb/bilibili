import { PLACEMENT, ELEMENT_TEXT, TAG_HOST, TAG_ROOT, TAG_TEXT } from "./enums"
import { setProps } from './units'

let nextUnitOfWrok = null
let workInProgressRoot = null   // 根fiber
function scheduleRoot(rootFiber) {
  nextUnitOfWrok = rootFiber
  workInProgressRoot = rootFiber
}
function performUnitOfWork(currentFiber) {
  beginWork(currentFiber)
  if (currentFiber.child) {
    return currentFiber.child
  }
  while (currentFiber) {
    completeUnitOfWork(currentFiber)
    if (currentFiber.sibling) {
      return currentFiber.sibling
    }
    currentFiber = currentFiber.return
  }
}
function completeUnitOfWork(currentFiber) {
  const returnFiber = currentFiber.return
  if (returnFiber) {  // todo
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect
    }
    if (currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
      } else {
        returnFiber.lastEffect = currentFiber.lastEffect
      }
    }
    const effectTag = currentFiber.effectTag
    if (effectTag) {
      if (!!returnFiber.lastEffect) {
        returnFiber.lastEffect.sibling = currentFiber
      } else { // todo
        returnFiber.firstEffect = currentFiber
      }
      returnFiber.lastEffect = currentFiber
    }
  }
}
function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDom(currentFiber)
  }
  const newChild = currentFiber.props.children
  reconcileChildren(currentFiber, newChild)
}
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber)
  } else if (currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber)
  }
}
function updateDom(stateNode, oldProps, newProps) {
  setProps(stateNode, oldProps, newProps)
}
function createDom(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    return document.createTextNode(currentFiber.props.text)
  } else if (currentFiber.tag === TAG_HOST) {
    let stateNode = document.createElement(currentFiber.type)
    updateDom(stateNode, {}, currentFiber.props)
    return stateNode
  }
}
function updateHostText(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDom(currentFiber)
  }
}
function updateHostRoot(currentFiber) {
  let children = currentFiber.props.children
  reconcileChildren(currentFiber, children)
}
function reconcileChildren(currentFiber, children) {
  let childIndex = 0
  let prevSibling
  while (childIndex < children.length) {
    const child = children[childIndex]
    let tag
    if (child.type === ELEMENT_TEXT) {
      tag = TAG_TEXT  // 本文节点
    } else if (typeof child.type === 'string') {
      tag = TAG_HOST  // 原生dom节点
    }
    let fiber = {
      tag,
      type: child.type,
      props: child.props,
      stateNode: null,
      return: currentFiber,
      effectTag: PLACEMENT, // 副作用标识
      nextEffect: null,
    }
    if (fiber) {
      if (childIndex === 0) {
        currentFiber.child = fiber

      } else {
        prevSibling.sibling = fiber
      }
      prevSibling = fiber
    }
    childIndex++
  }
}
function wookLoop(deadline) {
  let shouldYield = false   // 是否要让出控制权给浏览器
  while (nextUnitOfWrok && !shouldYield) {
    nextUnitOfWrok = performUnitOfWork(nextUnitOfWrok)
    shouldYield = deadline.timeRemaining() < 1  // 剩余时间小于1 让出控制权
  }
  if (!nextUnitOfWrok && workInProgressRoot) {
    console.log('render over')
    commitRoot()
  }
  requestIdleCallback(wookLoop, { timeout: 500 })
}
function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect
  while (currentFiber) {
    commitWook(currentFiber)
    currentFiber = currentFiber.nextEffect
  }
  workInProgressRoot = null
}
function commitWook(currentFiber) {
  if (!currentFiber) return
  let returnFiber = currentFiber.return
  let returnDOM = returnFiber.stateNode
  if (currentFiber.effectTag === PLACEMENT) {
    returnDOM.appendChild(currentFiber.stateNode)
  }
  returnFiber.effectTag = null
}
requestIdleCallback(wookLoop, { timeout: 500 })
export { scheduleRoot }