import {
    ELEMENT_TEXT,
    UPDATE,
    PLACEMENT,
    DELETION,
} from './enum'
let nextUnitOfWork = null
let wrokInProgressRoot = null
let currentRoot = null
let deletions = []
let hookIndex = 0
let wipFiber = null

const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in prev)
function updateDom (dom, prevProps, nextProps) {
    // 删除旧的事件函数或已经改变了的事件函数
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => !(key in nextProps) || prevProps[key] !== nextProps[key])
        .forEach(name => {
            const eventType = name.toLocaleLowerCase().substring(2)
            dom.removeEventListener(eventType, prevProps[name])
        })
    // 删除旧属性
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => dom[name] = '')
    // 添加新属性 更改属性值
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            dom[name] = nextProps[name]
        })
    // 添加新的事件函数
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name.toLocaleLowerCase().substring(2)
            dom.addEventListener(eventType, nextProps[name])
        })
}

function reconcileChildren(fiber, elements) {
    let index = 0
    let oldFiber = fiber.alternate && fiber.alternate.child
    let prevSibling = null
    while(index < elements.length || !!oldFiber) {
        const element = elements[index]
        let newFiber = null
        const sameType = oldFiber && element && oldFiber.type === element.type
        if(sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: fiber,
                alternate: oldFiber,
                effectTag: UPDATE,
            }
        }
        if(element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: fiber,
                alternate: null,
                effectTag: PLACEMENT,
            }
        }
        if(oldFiber && !sameType) {
            oldFiber.effectTag = DELETION
            deletions.push(oldFiber)
        }
        if(oldFiber) {
            oldFiber = oldFiber.sibling
        }
        if(index === 0) {
            fiber.child = newFiber
        } else if(element){
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        index++
    }
}

function commitRoot () {
    deletions.forEach(commitWork)
    commitWork(wrokInProgressRoot.child)
    currentRoot = wrokInProgressRoot
    wrokInProgressRoot = null
}

function commitDeletion(fiber, domParent) {
    if(fiber.dom) {
        domParent.removeChild(fiber.dom)
    }else {
        commitDeletion(fiber.child, domParent)
    }
}

function commitWork(fiber) {
    if(!fiber) return
    let domParentFiber = fiber.parent
    while(!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }
    const domParent = domParentFiber.dom
    if(fiber.effectTag === PLACEMENT && fiber.dom !== null) {
        domParent.appendChild(fiber.dom)
    } else if(fiber.effectTag === DELETION) {
        commitDeletion(fiber, domParent)
    }else if(fiber.effectTag === UPDATE && fiber.dom !== null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

/** 根据fiber 创建真实dom */
function createDom(fiber) {
    const dom = fiber.type === ELEMENT_TEXT ?
        fiber.dom = document.createTextNode('')
        :
        fiber.dom = document.createElement(fiber.type)
    updateDom(dom, {}, fiber.props)
    return dom
}

function updateFunctionComponent (fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []

    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
}

function updateHostComponent (fiber) {
    if(!fiber.dom) fiber.dom = createDom(fiber)

    const children = fiber.props.children
    reconcileChildren(fiber, children)
}

/**
 * 做了三件事
 * 1. 根据当前fiber生成真实dom
 * 2. 为children生成fiber
 * 3. 选择下一个工作单元
 */
function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function
    if(isFunctionComponent) {
        updateFunctionComponent(fiber)
    }else {
        updateHostComponent(fiber)
    }


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
    if(!nextUnitOfWork && wrokInProgressRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function render(element, container) {
    wrokInProgressRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot
    }
    deletions = []
    nextUnitOfWork = wrokInProgressRoot
}


export function useState(initValue) {
    const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex]
    const hook = {
        state: oldHook ? oldHook.state : initValue,
        queue: []
    }
    const actions = oldHook ? oldHook.queue : []
    actions.forEach(action => {
        hook.state = action(hook.state)
    })
    const setState = action => {
        hook.queue.push(action)
        wrokInProgressRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot
        }
        nextUnitOfWork = wrokInProgressRoot
        deletions = []
    }
    wipFiber.hooks.push(hook)
    hookIndex++
    return [hook.state, setState]
}

const DidactDOM = {
    render,
}
export default DidactDOM