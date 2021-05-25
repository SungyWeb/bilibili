import {NoFlags, ForceUpdateForLegacySuspense} from "./ReactFiberFlags"
import {includesSomeLane, NoLanes} from "./ReactFiberLane"
import { hasContextChanged } from './ReactFiberContext'
import {HostRoot} from "./ReactWorkTags"
import {cloneUpdateQueue, processUpdateQueue} from './ReactUpdateQueue'
let didReceiveUpdate = false



function beginWork(current, workInProgress, renderLanes) {
  const updateLanes = workInProgress.lanes
  if(current !== null) {
    const oldProps = current.memoizedProps
    const newProps = workInProgress.pendingProps

    if(oldProps !== newProps || hasContextChanged() || workInProgress.type !== current.type) {
      didReceiveUpdate = true
    }else if(!includesSomeLane(renderLanes, updateLanes)) {
      didReceiveUpdate = false
      // todo bailoutOnAlreadyFinishedWork
    }else {
      if((current.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
        didReceiveUpdate = true
      }else {
        didReceiveUpdate = false
      }
    }
  }else {
    didReceiveUpdate = false
  }

  workInProgress.lanes = NoLanes
  switch(workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes)
  }
}
function pushHostRootContext(workInProgress) {
  // todo something
}
function updateHostRoot(current, workInProgress, renderLanes) {
  pushHostRootContext(workInProgress)
  const updateQueue = workInProgress.updateQueue
  const nextProps = workInProgress.pendingProps
  const prevState = workInProgress.memoizedProps
  const prevChildren = prevState !== null ? prevState.element : null
  cloneUpdateQueue(current, workInProgress)
  processUpdateQueue(workInProgress, nextProps, null, renderLanes)
  const nextState = workInProgress.memoizedState
  const nextChildren = nextState.element
  console.log(nextState)
}

export {
  beginWork
}