import { createHostRootFiber } from './ReactFiber'
import { initializeUpdateQueue } from './ReactUpdateQueue'
import {noTimeout} from './ReactFiberHostConfig'
import {
  NoLanePriority,
  NoLanes,
  createLaneMap,
  NoTimestamp,
} from './ReactFiberLane'

/**
 * FiberRootNode
 * tag: LegacyRoot 区分 LegacyRoot BlockingRoot ConcurrentRoot
 * containerInfo: container root dom节点
 * pendingChildren: react-dom不会用到
 * current: 当前应用对应的Fiber对象，是Root Fiber
 */
 function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag
  this.containerInfo = containerInfo
  this.pendingChildren = null
  this.current = null
  this.pingCache = null
  this.finishedWork = null
  this.timeoutHandle = noTimeout
  this.context = null
  this.pendingContext = null
  this.hydrate = hydrate
  this.callbackNode = null
  this.callbackPriority = NoLanePriority
  this.eventTimes = createLaneMap(NoLanes)
  this.expirationTimes = createLaneMap(NoTimestamp)

  this.pendingLanes = NoLanes
  this.suspendedLanes = NoLanes
  this.pingedLanes = NoLanes
  this.expiredLanes = NoLanes
  this.mutableReadLanes = NoLanes
  this.finishedLanes = NoLanes

  this.entangledLanes = NoLanes
  this.entanglements = createLaneMap(NoLanes)

}


export function createFiberRoot(containerInfo, tag, hydrate, hydrateCallback) {
  const root = new FiberRootNode(containerInfo, tag, hydrate)
  const uninitializedFiber = createHostRootFiber(tag)
  root.current = uninitializedFiber
  uninitializedFiber.stateNode = root

  initializeUpdateQueue(uninitializedFiber)

  return root

}
