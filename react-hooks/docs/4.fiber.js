
// fiber 结构树
let A1 = { type: 'div', key:'A1' }
let B1 = { type: 'div', key:'B1', return: A1 }
let B2 = { type: 'div', key:'B2', return: A1 }
let C1 = { type: 'div', key:'C1', return: B1 }
let C2 = { type: 'div', key:'C2', return: B1 }
A1.child = B1
B1.sibling = B2
B1.child = C1
C1.sibling = C2

let nextUnitOfWork = A1   // 下一个执行单元,开始的时候 为A1
function workLoop () {
    while(nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
}

function performUnitOfWork(fiber) {
    beginWork(fiber)   // 处理执行单元
    if(fiber.child) {
        // 如果有儿子，则返回儿子
        return fiber.child
    }
    // 执行到这里 说明没有儿子
    while(fiber) {
        // 没有儿子的节点 说明该节点遍历结束
        completeWork(fiber)
        if(fiber.sibling) {
            // 如果有弟弟，则返回弟弟
            return fiber.sibling
        }else {
            // 没有弟弟 则将当前节点设置为父节点
            fiber = fiber.return
        }
    }
}
function completeWork(fiber) {
    console.log('结束工作： '+fiber.key)
}
function beginWork(fiber) {
    console.log('开始工作： '+fiber.key)
    
}
workLoop()