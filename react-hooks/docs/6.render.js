function render(element, container) {
    // 每个虚拟节点都会创建对应的一个功能更多的fiber
    let rootFiber = {
        tag: TAG_ROOT,  // 每一个fiber都会有个tag表示次元素的类型
        stateNode: container,  // 一般情况下如果这个元素是一个原生节点，该属性指向真实dom元素
        props: {
            children: [element],    // element 实际上是虚拟dom树对象，之后会根据这个对象创建对应的fiber树
        }
    }
    scheduleRoot(rootFiber)    // 从根节点开始调度
}