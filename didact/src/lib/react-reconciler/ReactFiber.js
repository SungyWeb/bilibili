import {
  ConcurrentRoot,
  BlockingRoot,
} from './ReactRootTags'
import { HostRoot } from './ReactWorkTags'
import { NoFlags } from './ReactFiberFlags'
import { NoLanes } from './ReactFiberLane'

const BlockingMode = 0b00010
const ConcurrentMode = 0b00100
const ProfileMode = 0b01000
const DebugTracingMode = 0b10000
const NoMode = 0b00000
const StrictMode = 0b00001


function FiberNode(tag,pendingProps,key,mode,) {
  // Instance
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null
  this.stateNode = null

  // Fiber
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0

  this.ref = null

  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.dependencies = null

  this.mode = mode

  // Effects
  this.flags = NoFlags
  this.nextEffect = null

  this.firstEffect = null
  this.lastEffect = null

  this.lanes = NoLanes
  this.childLanes = NoLanes

  this.alternate = null
}

function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode)
}

export function createHostRootFiber(tag) {
  let mode
  if (tag === ConcurrentRoot) {
    mode = ConcurrentMode | BlockingMode | StrictMode
  } else if (tag === BlockingRoot) {
    mode = BlockingMode | StrictMode
  } else {
    mode = NoMode
  }

  return createFiber(HostRoot, null, null, mode)
}


export function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate
  if (workInProgress === null) {
    // We use a double buffering pooling technique because we know that we'll
    // only ever need at most two versions of a tree. We pool the "other" unused
    // node that we're free to reuse. This is lazily created to avoid allocating
    // extra objects for things that are never updated. It also allow us to
    // reclaim the extra memory if needed.
    workInProgress = createFiber(
      current.tag,
      pendingProps,
      current.key,
      current.mode,
    )
    workInProgress.elementType = current.elementType
    workInProgress.type = current.type
    workInProgress.stateNode = current.stateNode


    workInProgress.alternate = current
    current.alternate = workInProgress
  } else {
    workInProgress.pendingProps = pendingProps
    // Needed because Blocks store data on type.
    workInProgress.type = current.type

    // We already have an alternate.
    // Reset the effect tag.
    workInProgress.flags = NoFlags

    // The effect list is no longer valid.
    workInProgress.nextEffect = null
    workInProgress.firstEffect = null
    workInProgress.lastEffect = null

  }

  workInProgress.childLanes = current.childLanes
  workInProgress.lanes = current.lanes

  workInProgress.child = current.child
  workInProgress.memoizedProps = current.memoizedProps
  workInProgress.memoizedState = current.memoizedState
  workInProgress.updateQueue = current.updateQueue

  // Clone the dependencies object. This is mutated during the render phase, so
  // it cannot be shared with the current fiber.
  const currentDependencies = current.dependencies
  workInProgress.dependencies =
    currentDependencies === null
      ? null
      : {
          lanes: currentDependencies.lanes,
          firstContext: currentDependencies.firstContext,
        }

  // These will be overridden during the parent's reconciliation
  workInProgress.sibling = current.sibling
  workInProgress.index = current.index
  workInProgress.ref = current.ref
  return workInProgress
}