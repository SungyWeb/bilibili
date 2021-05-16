const UpdateState = 0

export function initializeUpdateQueue(fiber) {
  const queue = {
    baseState: fiber.memoizedProps,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
    },
    effects: null,
  }
  fiber.updateQueue = queue
}

export function createUpdate(eventTime, lane) {
  const update = {
    eventTime,
    lane,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
  };
  return update;
}

export function enqueueUpdate(fiber, update) {
  const updateQueue = fiber.updateQueue
  if(updateQueue === null) {
    return
  }
  const sharedQueue = updateQueue.shared
  const pending = sharedQueue.pending
  if(pending === null) {
    update.next = update
  }else {
    update.next = pending.next
    pending.next = update
  }
  sharedQueue.pending = update
}

export function processUpdateQueue(workInProgress, props, instance, renderLanes) {

}