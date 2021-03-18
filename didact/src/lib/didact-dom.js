import { ELEMENT_TEXT } from './enum'
let nextUnitOfWork = null

/** 根据fiber 创建真实dom */
function createDom(fiber) {

}

/**
 * 做了三件事
 * 1. 根据当前fiber生成真实dom，并append到fiber.parent中
 * 2. 为children生成fiber
 * 3. 选择下一个工作单元
 */
function performUnitOfWork(fiber) {
    if(!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    if(fiber.parent) {
        fiber.parent.appendChild(fiber.dom)
    }

    const children = fiber.props.children
    let prevFiber = null
    children.forEach((child, index) => {
        const newFiber = {
            type: child.type,
            props: child.props,
            parent: fiber,
            dom: null,
        }
        if(index === 0) {
            fiber.child = newFiber
        }else {
            prevFiber.sibling = newFiber
        }
        prevFiber = newFiber
    })

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
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function render(element, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element]
        }
    }
}

const DidactDOM = {
    render,
}
export default DidactDOM