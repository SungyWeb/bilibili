import {
  LegacyRoot
} from '../Reconciler/ReactRootTags'
import {
  createContainer,
} from '../Reconciler/ReactFiberReconciler'
import { markContainerAsRoot } from './ReactDOMComponentTree'

function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options)
}

function createRootImpl(container, tag, options) {
  /**
   * 去掉服务端相关 hydrate
   */
  let root = createContainer(container, tag, undefined, undefined)
  markContainerAsRoot(root.current, container)

  /**
   * 监听所有支持的事件
   * listenToAllSupportedEvents(container)
   */
  return root
}

export function createLegacyRoot(container, options) {
  return new ReactDOMBlockingRoot(container, LegacyRoot, options)
}