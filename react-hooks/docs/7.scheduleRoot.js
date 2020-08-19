/**
 * 从根节点开始调度
 * 这里有两个阶段 diff 和 render
 * diff对比新旧虚拟dom 进行更新  render进行渲染
 * 所以这两个阶段工作量大，我们需要对任务进行拆分
 * 拆分的维度就是虚拟dom节点，每个虚拟dom就是一个任务，任务通过requestIdleCallback执行
 * 任务全部执行完毕后，进行commit提交阶段，进行实际dom更新，次阶段不能中断
 */
let nextUnitOfWork = null
function scheduleRoot(rootFiber) {
    nextUnitOfWork = rootFiber
}
function wookLoop(deadline) {
    let shouldYield = false    // 是否让出控制权
    while(nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeReminding() < 1      // 单帧内没有空余时间了，需要让出控制权
    }
    if(!nextUnitOfWork) {
        console.log('执行结束')
    }
    requestIdleCallback(wookLoop, {timeout: 500})   // 无论 每一帧都执行wookLoop 这样 一旦nextUnitOfWork有值且有时间时，就会立即执行
}
// 执行任务，并返回下一个fiber
// 根据fiber遍历规则，返回的fiber顺序为 子fiber、下一个相邻的fiber、父级的下一个相邻fiber
function performUnitOfWork(unit) {

} 
// 告诉浏览器 每一帧空闲时，执行
requestIdleCallback(wookLoop, {timeout: 500})