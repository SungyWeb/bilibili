import {
  LegacyRoot
} from '../react-reconciler/ReactRootTags'
import {
  createContainer,
} from '../react-reconciler/ReactFiberReconciler'
import { markContainerAsRoot } from './ReactDOMComponentTree'

function createRootImpl(container, tag, options) {
  // Tag is either LegacyRoot or Concurrent Root
  let hydrate = false   // 不考虑服务端渲染
  let hydrateCallback = null
  const root = createContainer(container, tag, hydrate, hydrateCallback)
  markContainerAsRoot(root.current, container)

  // todo: listenToAllSupportedEvents

  return root
}

function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options)
}


export function createLegacyRoot(container, options) {
  return new ReactDOMBlockingRoot(container, LegacyRoot, options)
}