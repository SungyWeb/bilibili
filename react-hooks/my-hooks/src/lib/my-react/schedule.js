import { TAG_ROOT, TAG_TEXT, ELEMENT_TEXT, TAG_HOST, PLACEMENT, } from './constants'
import { setProps } from './units'


let nextUnitOfWork = null   // 下一个工作单元
let workInProgressRoot = null   // 根fiber
/**
 * 从根节点开始调度和渲染，这个过程包含以下阶段
 * 1. render阶段（也是diff阶段） 对比新旧虚拟dom，进行更新/删除/创建
 *    render阶段 这个阶段有两个任务  1. 根据虚拟dom生成fiber树 2. 这里收集effect list
 *    这个阶段可能会比较话费时间，所以需要按每个虚拟dom进行任务拆分，此阶段可以暂停，
 * 2. commit阶段 进行真实dom更新，不能暂停
 */
export function scheduleRoot(rootFiber) {
  nextUnitOfWork = rootFiber
  workInProgressRoot = rootFiber
}

/**
 * 收集副作用，组成effect list
 * @param {*} currentFiber 
 */
function completeUnitOfWork(currentFiber) {
  if (currentFiber.props.id === 'B1') {
    // debugger
    console.log('B1')
  }
  const returnFiber = currentFiber.return
  // debugger
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect
    }
    if (currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.next = currentFiber.firstEffect
      } else {
        returnFiber.lastEffect = currentFiber.lastEffect
      }
    }
    const effectTag = currentFiber.effectTag

    if (effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber
      } else {
        returnFiber.firstEffect = currentFiber
      }
      returnFiber.lastEffect = currentFiber
    }
  }
}

/**
 * 协调子节点
 * @param {*} currentFiber 
 * @param {*} newChildren 
 */
function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0   // 新的子fiber的索引
  let prevSibling   // 上一个新的子fiber
  // 遍历子虚拟dom数组，为每个虚拟dom创建fiber
  while (newChildIndex < newChildren.length) {
    let newChild = newChildren[newChildIndex]
    let tag
    if (newChild.type === ELEMENT_TEXT) {    // 文本节点
      tag = TAG_TEXT
    } else if (typeof newChild.type === 'string') {   // 原生dom节点
      tag = TAG_HOST
    }
    // 创建fiber
    const newFiber = {
      tag,
      type: newChild.type,
      props: newChild.props,
      stateNode: null,    // div还没有创建dom元素
      return: currentFiber,   // 当前的fiber，即子fiber都return父fiber
      effectTag: PLACEMENT,   // 副作用标标识 收集副作用
      nextEffect: null,
    }
    if (newChildIndex === 0) {   // 根元素下的子元素（唯一）
      currentFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber    // 将上一个fiber的sibling 指向newFiber
    }
    prevSibling = newFiber

    newChildIndex++
  }
}

/**
 * 更新dom
 * @param {*} stateNode 真实dom
 * @param {*} oldProps dom旧属性
 * @param {*} newProps dom新属性
 */
function updateDom(stateNode, oldProps, newProps) {
  setProps(stateNode, oldProps, newProps)
}

function createDom(fiber) {
  if (fiber.tag === TAG_TEXT) {
    return document.createTextNode(fiber.props.text)
  } else if (fiber.tag === TAG_HOST) {
    const stateNode = document.createElement(fiber.type)
    updateDom(stateNode, {}, fiber.props)
    return stateNode
  }
}

/**
 * 更新根节点
 * @param {*} fiber 
 */
function updateHostRoot(fiber) {
  let newChildren = fiber.props.children
  reconcileChildren(fiber, newChildren)
}

/**
 * 更新文本节点
 * @param {*} fiber 
 */
function updateHostText(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDom(fiber)
  }
}

/**
 * 更新原生dom节点
 * @param {*} fiber 
 */
function updateHost(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDom(fiber)
  }
  const newChildren = fiber.props.children
  reconcileChildren(fiber, newChildren)
}
/**
 * 开始工作
 * 1. 创建真实dom
 * 2. 创建子fiber
 * @param {*} currentFiber 
 */
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {    // 根节点
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === TAG_TEXT) {   // 文本节点
    updateHostText(currentFiber)
  } else if (currentFiber.tag === TAG_HOST) {   // 原生dom节点
    updateHost(currentFiber)
  }

}

function performUnitOfWork(currentFiber) {
  console.log(workInProgressRoot)
  beginWork(currentFiber)   // 开始工作
  if (currentFiber.child) {
    return currentFiber.child
  }
  while (currentFiber) {
    completeUnitOfWork(currentFiber)    // 没有子fiber, 完成工作
    if (currentFiber.sibling) {   // 找下一个fiber
      return currentFiber.sibling
    }
    currentFiber = currentFiber.return  // 没有下一个fiber， currentFiber为父fiber，让父fiber完成，再找fufiber的sibling
  }
}
// 循环执行工作
function workLoop(deadline) {
  let shouldYield = false   // 是否让出控制权

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)  // 执行工作单元，并返回下一个工作单元
    shouldYield = deadline.timeRemaining() < 1    // 剩余时间小于1，则让出控制权， 不再执行任务
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    console.log('render阶段结束')
    commitRoot()
  }
  // 每一贞都会请求循环执行工作
  requestIdleCallback(workLoop, { timeout: 500 })
}

function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect
  while (currentFiber) {
    commitWork(currentFiber)
    currentFiber = currentFiber.nextEffect
  }
  workInProgressRoot = null
}
function commitWork(fiber) {
  if (!fiber) return
  const returnFiber = fiber.return
  const returnDom = returnFiber.stateNode
  if (fiber.effectTag === PLACEMENT) {
    returnDom.appendChild(fiber.stateNode)
  }
  fiber.effectTag = null
}
// 浏览器空闲时，循环执行工作,如果500ms还没有空闲时间，则必须立即执行
requestIdleCallback(workLoop, { timeout: 500 })

