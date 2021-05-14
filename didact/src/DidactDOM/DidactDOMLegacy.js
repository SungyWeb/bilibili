import { createLegacyRoot } from './DidactDOMRoot'
import { unbatchedUpdates, updateContainer } from '../Reconciler/ReactFiberReconciler'

function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  /**
   * 清空 container中的所有自元素
   */
  return createLegacyRoot(container, undefined)
}

// forceHydrate 老版本用于服务端渲染 已废弃
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  let root = container._reactRootContainer
  let fiberRoot
  if(!root) {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)
    fiberRoot = root._internalRoot
    /**
     * 执行callback
     */

    // 初始化的时候不对多次更新进行合并处理
    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, callback)
    })
  }else {
    fiberRoot = root._internalRoot
    /**
     * 执行callback
     */
     updateContainer(children, fiberRoot, parentComponent, callback)
  }
  // return getPublicRootInstance(fiberRoot)
}

export function render(element, container, callback) {
  return legacyRenderSubtreeIntoContainer(null, element, container, false, callback)
}