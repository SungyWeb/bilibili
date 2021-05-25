import {
  createFiberRoot,
} from './ReactFiberRoot'
import { unbatchedUpdates, requestEventTime, requestUpdateLane, scheduleUpdateOnFiber } from './ReactFiberWorkLoop'
import { createUpdate, enqueueUpdate } from './ReactUpdateQueue'

export function createContainer(containerInfo, tag, hydrate, hydrateCallback) {
  return createFiberRoot(containerInfo, tag, hydrate, hydrateCallback)
}


export function updateContainer(element, container, parentComponent, callback) {
  const current = container.current
  const eventTime = requestEventTime()
  const lane = requestUpdateLane(current)
  const update = createUpdate(eventTime, lane)
  update.payload = {element}
  enqueueUpdate(current, update)
  scheduleUpdateOnFiber(current, lane, eventTime)
  return lane
}

export {
  unbatchedUpdates,
}
