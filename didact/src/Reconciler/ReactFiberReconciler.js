import {
  HostRoot
} from './ReactWorkTags'
import { NoFlags } from './ReactFiberFlags'
import { initializeUpdateQueue, createUpdate, enqueueUpdate } from './ReactUpdateQueue'
import { unbatchedUpdates, requestEventTime } from './ReactFiberWorkLoop'
import {scheduleUpdateOnFiber} from '../Scheduler/SchedulerPostTask'


function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.current = null;
  this.pingCache = null;
  this.finishedWork = null;
  // this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  // this.callbackPriority = NoLanePriority;
  // this.eventTimes = createLaneMap(NoLanes);
  // this.expirationTimes = createLaneMap(NoTimestamp);

  // this.pendingLanes = NoLanes;
  // this.suspendedLanes = NoLanes;
  // this.pingedLanes = NoLanes;
  // this.expiredLanes = NoLanes;
  // this.mutableReadLanes = NoLanes;
  // this.finishedLanes = NoLanes;

  // this.entangledLanes = NoLanes;
  // this.entanglements = createLaneMap(NoLanes);

}

const noMode = 0


function FiberNode(tag,pendingProps,key,mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // this.lanes = NoLanes;
  // this.childLanes = NoLanes;

  this.alternate = null;

}

const createFiber = function(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode)
}

export function createHostRootFiber(tag) {
  return createFiber(HostRoot, null, null, noMode);
}


function createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks) {
  const root = new FiberRootNode(containerInfo, tag, hydrate)
  const uninitializedFiber = createHostRootFiber(tag);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  initializeUpdateQueue(uninitializedFiber);

  return root;
}

function createContainer(containerInfo, tag, hydrate, hydrationCallbacks) {
  return createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks)
}
function updateContainer(element, container, parentComponent, callback) {
  const current = container.current
  const eventTime = requestEventTime();
  // const lane = requestUpdateLane(current);
  const update = createUpdate(eventTime, null)
  update.payload = {element}

  enqueueUpdate(current, update)
  scheduleUpdateOnFiber(current, null, eventTime);
}

export {
  createContainer,
  createFiberRoot,
  unbatchedUpdates,
  updateContainer,
}