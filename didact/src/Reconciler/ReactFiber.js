import { HostComponent, IndeterminateComponent } from './ReactWorkTags'
import {NoFlags, Placement} from './ReactFiberFlags';
import { NoLanes } from './ReactFiberLane'

function FiberNode(tag, pendingProps, key, mode) {
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

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
}

export function createFiberFromElement(element, mode, lanes) {
  const type = element.type;
  const key = element.key;
  const pendingProps = element.props;
  const fiber = createFiberFromTypeAndProps(
    type,
    key,
    pendingProps,
    null,
    mode,
    lanes,
  )
  return fiber
}

const createFiber = function(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode)
}

export function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
  let fiberTag = IndeterminateComponent   // 暂时还不知道是class还是function
  let resolvedType = type
  if(typeof type === 'function') {

  }else if(typeof type === 'string') {
    fiberTag = HostComponent
  }else {

  }
  let fiber = createFiber(fiberTag, pendingProps, key, mode)
  fiber.elementType = type
  fiber.type = resolvedType
  fiber.lanes = lanes
  return fiber
}