import {
  NoTimestamp,
  SyncLane,
  mergeLanes,
  includesSomeLane,
  markRootUpdated,
  NoLanes,
  getNextLanes,
} from './ReactFiberLane'
import { now, flushSyncCallbackQueue, getCurrentPriorityLevel } from './SchedulerWithReactIntegration'
import {runWithPriority} from './SchedulerWithReactIntegration'
import {
  BlockingMode,
  NoMode,
  StrictMode,
  ConcurrentMode,
  ProfileMode
} from './ReactTypeOfMode'
import {HostRoot} from './ReactWorkTags'
import {__interactionsRef, __subscriberRef} from '../scheduler/Tracing'
import { LegacyRoot } from './ReactRootTags'
import ReactCurrentDispatcher from '../react/ReactCurrentDispatcher'
import {NoFlags} from './ReactFiberFlags'
import {createWorkInProgress} from './ReactFiber'
import {beginWork} from './ReactFiberBeginWork'
import {ImmediatePriority} from '../scheduler/SchedulerPriorities'
let workInProgress = null

const RootIncomplete = 0
const RootFatalErrored = 1
const RootErrored = 2
const RootSuspended = 3
const RootSuspendedWithDelay = 4
const RootCompleted = 5
let workInProgressRootFatalError = null
let workInProgressRootSkippedLanes = NoLanes
let workInProgressRootUpdatedLanes = NoLanes
let workInProgressRootPingedLanes = NoLanes
let workInProgressRoot = null
let mostRecentlyUpdatedRoot = null
let workInProgressRootIncludedLanes = NoLanes
let workInProgressRootRenderLanes = NoLanes
let subtreeRenderLanes = NoLanes
export const NoContext = /*             */ 0b0000000
const BatchedContext = /*               */ 0b0000001
const EventContext = /*                 */ 0b0000010
const DiscreteEventContext = /*         */ 0b0000100
const LegacyUnbatchedContext = /*       */ 0b0001000
const RenderContext = /*                */ 0b0010000
const CommitContext = /*                */ 0b0100000
export const RetryAfterError = /*       */ 0b1000000

let executionContext = NoContext

let currentEventTime = NoTimestamp
let workInProgressRootRenderTargetTime = Infinity
const RENDER_TIMEOUT_MS = 500

let workInProgressRootExitStatus = RootIncomplete



function resetRenderTimer() {
  workInProgressRootRenderTargetTime = now() + RENDER_TIMEOUT_MS
}

export function unbatchedUpdates(fn) {
  const prevExecutionContext = executionContext
  executionContext &= ~BatchedContext
  executionContext |= LegacyUnbatchedContext
  try {
    return fn()
  } finally {
    executionContext = prevExecutionContext
    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      resetRenderTimer()
      flushSyncCallbackQueue()
    }
  }
}

export function requestEventTime() {
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    // We're inside React, so it's fine to read the actual time.
    return now()
  }
  // We're not inside React, so we may be in the middle of a browser event.
  if (currentEventTime !== NoTimestamp) {
    // Use the same start time for all updates until we enter React again.
    return currentEventTime
  }
  // This is the first update since React yielded. Compute a new start time.
  currentEventTime = now()
  return currentEventTime
}

export function requestUpdateLane(fiber) {
  const mode = fiber.mode
  if((mode & BlockingMode) === NoMode) {
    return SyncLane
  }


  return SyncLane
}

export function markSkippedUpdateLanes(lane) {
  workInProgressRootSkippedLanes = mergeLanes(lane, workInProgressRootSkippedLanes)
}

function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
  sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane)
  let alternate = sourceFiber.alternate
  if(alternate !== null) {
    alternate.lanes = mergeLanes(alternate.lanes, lane)
  }
  let node = sourceFiber
  let parent = sourceFiber.return
  while(parent !== null) {
    parent.childLanes = mergeLanes(parent.childLanes, lane)
    alternate = parent.alternate
    if(alternate !== null) {
      alternate.childLanes = mergeLanes(alternate.childLanes, lane)
    }
    node = parent
    parent = null
  }
  if(node.tag === HostRoot) {
    const root = node.stateNode
    return root
  }else {
    return null
  }
}

function scheduleInteractions(root, lane, interactions) {
  if(interactions.size > 0) {
    const pendingInteractionMap = root.pendingInteractionMap
    const pendingInteractions = pendingInteractionMap.get(lane)
    if(pendingInteractions !== null) {
      interactions.forEach(interaction => {
        if(!pendingInteractions.has(interaction)) {
          interaction.__count++
        }
        pendingInteractions.add(interaction)
      })
    }else {
      pendingInteractionMap.set(lane, new Set(interactions))
      interactions.forEach(interaction => {
        interaction.__count++
      })
    }
    const subscriber = __subscriberRef.current
    if (subscriber !== null) {
      // todo
      // const threadID = computeThreadID(root, lane);
      // subscriber.onWorkScheduled(interactions, threadID);
    }
  }
}
function schedulePendingInteractions(root, lane) {
  scheduleInteractions(root, lane, __interactionsRef.current)
}

function pushDispatcher() {
  // todo run hooks
  /*
  const prevDispatcher = ReactCurrentDispatcher.current;
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  if (prevDispatcher === null) {
    // The React isomorphic package does not include a default dispatcher.
    // Instead the first renderer will lazily attach one, in order to give
    // nicer error messages.
    return ContextOnlyDispatcher;
  } else {
    return prevDispatcher;
  }
  */
}

function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate
  let next = beginWork(current, unitOfWork, subtreeRenderLanes)
  unitOfWork.memoizedProps = unitOfWork.pendingProps
  if(next === null) {
    /*
     completeUnitOfWork(unitOfWork)
     */
  }else {
    workInProgress = next
  }
}

function workLoopSync() {
  while(workInProgress !== null) {
    performUnitOfWork(workInProgress)
    workInProgress = null
  }
}

export function flushPassiveEffects() {
  // todo effects
  return false
}


function prepareFreshStack(root, lanes) {
  root.finishedWork = null
  root.finishedLanes = NoLanes

  workInProgressRoot = root
  workInProgress = createWorkInProgress(root.current, null)
  workInProgressRootRenderLanes = subtreeRenderLanes = workInProgressRootIncludedLanes = lanes
  workInProgressRootExitStatus = RootIncomplete
  workInProgressRootFatalError = null
  workInProgressRootSkippedLanes = NoLanes
  workInProgressRootUpdatedLanes = NoLanes
  workInProgressRootPingedLanes = NoLanes
}
function renderRootSync(root, lanes) {
  const prevExecutionContext = executionContext
  executionContext |= RenderContext
  const prevDispatcher = pushDispatcher()

  if(workInProgress !== root || workInProgressRootRenderLanes !== lanes) {
    prepareFreshStack(root, lanes)
    // startWorkOnPendingInteractions(root, lanes)
  }

  do{
    try{
      workLoopSync()
      break
    }catch(err) {
      throw new Error(err)
    }
  }while(true)

  // Set this to null to indicate there's no in-progress render.
  workInProgressRoot = null
  workInProgressRootRenderLanes = NoLanes

  return workInProgressRootExitStatus
}
function commitRoot(root) {
  const renderPriorityLevel = getCurrentPriorityLevel()
  runWithPriority(ImmediatePriority, commitRootImpl.bind(null, root, renderPriorityLevel))
  console.log(root)
  return null
}

function commitRootImpl(root, renderPriorityLevel) {

}
function performSyncWorkOnRoot(root) {
  flushPassiveEffects()

  let lanes
  let exitStatus
  if(root === workInProgressRoot && includesSomeLane(root.expiredLanes, workInProgressRootRenderLanes)) {
    lanes = workInProgressRootRenderLanes
    exitStatus = renderRootSync(root, lanes)
    if(includesSomeLane(workInProgressRootIncludedLanes, workInProgressRootUpdatedLanes)) {
      // The render included lanes that were updated during the render phase.
      // For example, when unhiding a hidden tree, we include all the lanes
      // that were previously skipped when the tree was hidden. That set of
      // lanes is a superset of the lanes we started rendering with.
      //
      // Note that this only happens when part of the tree is rendered
      // concurrently. If the whole tree is rendered synchronously, then there
      // are no interleaved events.

      lanes = getNextLanes(root, lanes)
      exitStatus = renderRootSync(root, lanes)
    }
  }else {
    lanes = getNextLanes(root, NoLanes)
    exitStatus = renderRootSync(root, lanes)
  }
  if(root.tag !== LegacyRoot && exitStatus === RootErrored) {
    // todo  some error
  }
  if(exitStatus === RootFatalErrored) {
    // todo some error
  }

  // will commit tree
  const finishedWork = root.current.alternate
  root.finishedWork = finishedWork
  root.finishedLanes = lanes
  commitRoot(root)

  // ensureRootIsScheduled(root, now())
  return null
}
export function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  const root = markUpdateLaneFromFiberToRoot(fiber, lane)
  if(root === null) {
    return null
  }
  // make that the root has a pending update
  markRootUpdated(root, lane, eventTime)
  if(root === workInProgressRoot) {
    // todo

    // rendering的过程中 收到一个root更新
    // 在这个树上，update 和 rendering是交错的（interleaved）
    //
    // Received an update to a tree that's in the middle of rendering. Mark
    // that there was an interleaved update work on this root. Unless the
    // `deferRenderPhaseUpdateToNextBatch` flag is off and this is a render
    // phase update. In that case, we don't treat render phase updates as if
    // they were interleaved, for backwards compat reasons.
    /*
    if(deferRenderPhaseUpdateToNextBatch || (executionContext & RenderContext) === NoContext) {
      workInProgressRootUpdatedLanes = mergeLanes(workInProgressRootUpdatedLanes, lane)
    }
    if(workInProgressRootExitStatus === RootSuspendedWithDelay) {
      markRootSuspended(root, workInProgressRootRenderLanes)
    }
    */
  }

  const priority = getCurrentPriorityLevel()
  if(lane === SyncLane) {
    if(
      // Check if we're inside unbatchedUpdates
      (executionContext & LegacyUnbatchedContext) !== NoContext &&
      // Check if we're not already rendering
      (executionContext & (RenderContext | CommitContext)) === NoContext
    ) {
      // 将交互数据注册到root上， 放置丢失
      // Register pending interactions on the root to avoid losing traced interaction data.
      schedulePendingInteractions(root, lane)

      // This is a legacy edge case. The initial mount of a ReactDOM.render-ed
      // root inside of batchedUpdates should be synchronous, but layout updates
      // should be deferred until the end of the batch.
      performSyncWorkOnRoot(root)
    }else {
      // ensureRootIsScheduled(root, eventTime);
      // schedulePendingInteractions(root, lane);
      if (executionContext === NoContext) {
        // Flush the synchronous work now, unless we're already working or inside
        // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
        // scheduleCallbackForFiber to preserve the ability to schedule a callback
        // without immediately flushing it. We only do this for user-initiated
        // updates, to preserve historical behavior of legacy mode.
        resetRenderTimer()
        flushSyncCallbackQueue()
      }
    }
  }else {
    // Schedule a discrete update but only if it's not Sync.
    /*
    if (
      (executionContext & DiscreteEventContext) !== NoContext &&
      // Only updates at user-blocking priority or greater are considered
      // discrete, even inside a discrete event.
      (priorityLevel === UserBlockingSchedulerPriority ||
        priorityLevel === ImmediateSchedulerPriority)
    ) {
      // This is the result of a discrete event. Track the lowest priority
      // discrete update per root so we can flush them early, if needed.
      if (rootsWithPendingDiscreteUpdates === null) {
        rootsWithPendingDiscreteUpdates = new Set([root]);
      } else {
        rootsWithPendingDiscreteUpdates.add(root);
      }
    }
    // Schedule other updates after in case the callback is sync.
    ensureRootIsScheduled(root, eventTime);
    schedulePendingInteractions(root, lane);
    */
  }

  // We use this when assigning a lane for a transition inside
  // `requestUpdateLane`. We assume it's the same as the root being updated,
  // since in the common case of a single root app it probably is. If it's not
  // the same root, then it's not a huge deal, we just might batch more stuff
  // together more than necessary.
  mostRecentlyUpdatedRoot = root
}