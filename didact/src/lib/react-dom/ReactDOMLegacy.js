import {
  createLegacyRoot,
} from './ReactDOMRoot'
import {
  unbatchedUpdates,
  updateContainer,
} from '../react-reconciler/ReactFiberReconciler'

function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  // 清空container
  if(!forceHydrate) {
    let rootSibling
    while(rootSibling = container.lastChild) {
      container.removeChild(rootSibling)
    }
  }
  return createLegacyRoot(container)
}

function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  let root = container._reactRootContainer
  let fiberRoot
  if(!root) {
    // 第一次渲染
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)
    fiberRoot = root._internalRoot
    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, callback)
    })
  }else {
    // 更新
    fiberRoot = root._internalRoot
    updateContainer(children, fiberRoot, parentComponent, callback)
  }
}


export function render(element, container, callback) {
  return legacyRenderSubtreeIntoContainer(null, element, container, false, callback)
}