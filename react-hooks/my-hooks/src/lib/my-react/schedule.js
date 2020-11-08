import { PLACEMENT, ELEMENT_TEXT, TAG_HOST, TAG_ROOT, TAG_TEXT, DELETION, UPDATE, TAG_Class } from "./enums"
import { setProps } from './units'
import { UpdateQueue } from './update-quene'
let nextUnitOfWrok = null
let workInProgressRoot = null   // 根fiber
let currentRoot = null   // 更新的根fiber
let deletions = []
function scheduleRoot(rootFiber) {
  if (currentRoot && currentRoot.alternate) {
    workInProgressRoot = currentRoot.alternate
    workInProgressRoot.props = rootFiber.props
    workInProgressRoot.alternate = currentRoot
  } else if (currentRoot) {
    rootFiber.alternate = currentRoot
    workInProgressRoot = rootFiber
  } else {
    workInProgressRoot = rootFiber
  }
  workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null
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
      }
      returnFiber.lastEffect = currentFiber.lastEffect
    }
    const effectTag = currentFiber.effectTag
    if (effectTag) {
      if (!!returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber
      }
      if (!returnFiber.firstEffect) {
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
  } else if (currentFiber.tag === TAG_Class) {
    updateClassComponent(currentFiber)
  }
}
function updateClassComponent(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = new currentFiber.type(currentFiber.props)
    currentFiber.stateNode.internalFiber = currentFiber
    currentFiber.updateQueue = new UpdateQueue()
  }
  currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate(currentFiber.stateNode.state)
  let newElement = currentFiber.stateNode.render()
  const newChild = [newElement]
  reconcileChildren(currentFiber, newChild)
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
  let oldFiber = currentFiber.alternate && currentFiber.alternate.child
  while (childIndex < children.length || oldFiber) {
    const child = children[childIndex]
    let fiber
    const sameType = oldFiber && child && oldFiber.type === child.type
    let tag
    if (child) {

      if (child.type === ELEMENT_TEXT) {
        tag = TAG_TEXT  // 本文节点
      } else if (typeof child.type === 'string') {
        tag = TAG_HOST  // 原生dom节点
      } else if (typeof child.type === 'function' && child.type.prototype.isReactComponent) {
        tag = TAG_Class
      }
    }
    if (sameType) {
      if (oldFiber.alternate) {
        fiber = {
          tag: oldFiber.tag,
          type: oldFiber.type,
          props: child.props,
          stateNode: oldFiber.stateNode,
          return: currentFiber,
          alternate: oldFiber,
          effectTag: UPDATE, // 副作用标识
          nextEffect: null,
        }
      }
    } else {
      if (child) {
        fiber = {
          tag,
          type: child.type,
          props: child.props,
          stateNode: null,
          return: currentFiber,
          effectTag: PLACEMENT, // 副作用标识
          nextEffect: null,
        }
      }
      if (oldFiber) {
        oldFiber.effectTag = DELETION
        deletions.push(oldFiber)
      }
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
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
  deletions.forEach(commitWork)
  let currentFiber = workInProgressRoot.firstEffect
  while (currentFiber) {
    commitWork(currentFiber)
    currentFiber = currentFiber.nextEffect
  }
  deletions.length = 0
  currentRoot = workInProgressRoot
  workInProgressRoot = null
}
function commitWork(currentFiber) {
  if (!currentFiber) return
  let returnFiber = currentFiber.return
  let returnDOM = returnFiber.stateNode
  if (currentFiber.effectTag === PLACEMENT) {
    returnDOM.appendChild(currentFiber.stateNode)
  } else if (currentFiber.effectTag === DELETION) {
    returnDOM.removeChild(currentFiber.stateNode)
  } else if (currentFiber.effectTag === UPDATE) {
    if (currentFiber.type === ELEMENT_TEXT) {
      if (currentFiber.alternate.props.text !== currentFiber.props.text) {
        currentFiber.stateNode.textContent = currentFiber.props.text
      }
    } else {
      updateDom(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props)
    }
  }
  currentFiber.effectTag = null
}
requestIdleCallback(wookLoop, { timeout: 500 })
export { scheduleRoot }