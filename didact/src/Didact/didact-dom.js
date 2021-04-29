import {
  TEXT_ELEMENT,
  UPDATE,
  PLACEMENT,
  DELETION
} from './enum'

let nextUnitOfWork = null
let workInProgress = null
let currentRoot = null
let deletions = []

const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)

function updateDom(dom, prevProps, nextProps) {
  // remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => dom[name] = '')
  // remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => {
      return !(key in nextProps) || isNew(prevProps, nextProps)(key)
    })
    .forEach(key => {
      const eventName = key.toLocaleLowerCase().substr(2)
      dom.removeEventListener(eventName, prevProps[key])
    })
  // set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => dom[name] = nextProps[name])
  // add new eventlisteners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })
}

function createTextNode() {
  return document.createTextNode('')
}

function createDomElement(fiber) {
  const dom = fiber.type === TEXT_ELEMENT ? createTextNode() : document.createElement(fiber.type)
  updateDom(dom, {}, fiber.props)
  fiber.dom = dom
}

function render(element, container) {
  workInProgress = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot,
  }
  nextUnitOfWork = workInProgress
  deletions = []
}

function commitWork(fiber) {
  if(!fiber) return
  const parentDom = fiber.parent.dom
  if(fiber.effectTag === PLACEMENT && parentDom) {
    parentDom.appendChild(fiber.dom)
  }else if(fiber.effectTag === UPDATE && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  }else if(fiber.effectTag === DELETION) {
    parentDom.removeChild(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitRoot() {
  deletions.forEach(commitWork)
  commitWork(workInProgress.child)
  currentRoot = workInProgress
  workInProgress = null
}

function reconcileChildren(fiber, elements) {
  let prevFiber = null
  let oldChildFiber = fiber.alternate && fiber.alternate.child
  let index = 0
  let newFiber = null
  while(index < elements.length || oldChildFiber) {
    const child = elements[index]
    const sameType = oldChildFiber && child && oldChildFiber.type === child.type
    if(sameType) {    // UPDATE
      newFiber = {
        type: oldChildFiber.type,
        props: child.props,
        dom: oldChildFiber.dom,
        parent: fiber,
        child: null,
        sibling: null,
        alternate: oldChildFiber,
        effectTag: UPDATE,
      }
    }
    if(child && !sameType) {  // placement
      newFiber = {
        type: child.type,
        props: child.props,
        dom: null,
        parent: fiber,
        child: null,
        sibling: null,
        alternate: null,
        effectTag: PLACEMENT,
      }
    }
    if(oldChildFiber && !sameType) {  // deletion
      oldChildFiber.effectTag = DELETION
      deletions.push(oldChildFiber)
    }
    if(index === 0) {
      fiber.child = newFiber
    }else {
      prevFiber.sibling = newFiber
    }
    prevFiber = newFiber
    if(oldChildFiber) {
      oldChildFiber = oldChildFiber.sibling
    }
    index++
  }
}

function performUnitOfWork(fiber) {
  if(!fiber.dom) {
    createDomElement(fiber)
  }

  let children = fiber.props.children
  reconcileChildren(fiber, children)

  if(fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while(nextFiber) {
    if(nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

function workLoop(deadline) {
  let shouldYield = false
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  if(!nextUnitOfWork && workInProgress) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)
const DidactDOM = {
  render,
}
export default DidactDOM