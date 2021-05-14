import { NoTimestamp } from './ReactFiberLane'
import {unstable_now} from '../Scheduler/SchedulerPostTask'
import {beginWork as originalBeginWork} from './ReactFiberBeginWork';

let currentEventTime = NoTimestamp
let workInProgressRoot = null
let workInProgress = null

export function requestEventTime() {
  currentEventTime = unstable_now()
  return currentEventTime
}

export function unbatchedUpdates (fn, a) {
  return fn(a)
}

export function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  const root = fiber.stateNode
  performSyncWorkOnRoot(root)
}

function prepareFreshStack(root, lanes) {
  workInProgressRoot = root
  workInProgress = createWorkInProgress(root.current, null);
}
function performSyncWorkOnRoot (root) {
  renderRootSync(root, null)
}

function renderRootSync(root, lanes) {
  if(workInProgressRoot !== root) {
    prepareFreshStack(root, lanes)
    startWorkOnPendingInteractions(root, lanes)
  }
  workLoopSync()

  workInProgressRoot = null
}



let beginWork = originalBeginWork


function workLoopSync() {
  while(workInProgressRoot !== null) {
    performUnitOfWork(workInProgressRoot)
  }
}

function performUnitOfWork(unitOfWork) {
  console.log(performUnitOfWork)
  const current = unitOfWork.alternate
  let next = beginWork(current, unitOfWork, null)
  if(next === null) {
    completeUnitOfWork(unitOfWork)
  }else {
    workInProgressRoot = next
  }
}

function completeUnitOfWork(unitOfWork) {
  console.count('complete')
  workInProgressRoot = null
}