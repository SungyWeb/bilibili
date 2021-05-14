import { NoTimestamp } from './ReactFiberLane'
import {unstable_now} from '../Scheduler/SchedulerPostTask'
import {beginWork as originalBeginWork} from './ReactFiberBeginWork';

let currentEventTime = NoTimestamp
let workInProgressRoot = null

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

function performSyncWorkOnRoot (root) {
  renderRootSync(root, null)
}

function renderRootSync(root, lane) {
  do{
    workLoopSync()
  }while(true)

  workInProgressRoot = null
}



let beginWork = originalBeginWork


function workLoopSync() {
  while(workInProgressRoot !== null) {
    performUnitOfWork(workInProgressRoot)
  }
}

function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate
  let next = beginWork(current, unitOfWork, null)
  if(next === null) {
    completeUnitOfWork(unitOfWork)
  }else {
    workInProgressRoot = next
  }
}