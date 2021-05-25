
export const SyncLanePriority = 15
export const SyncBatchedLanePriority = 14

const InputDiscreteHydrationLanePriority = 13
export const InputDiscreteLanePriority = 12

const InputContinuousHydrationLanePriority = 11
export const InputContinuousLanePriority = 10

const DefaultHydrationLanePriority = 9
export const DefaultLanePriority = 8

const TransitionHydrationPriority = 7
export const TransitionPriority = 6

const RetryLanePriority = 5

const SelectiveHydrationLanePriority = 4

const IdleHydrationLanePriority = 3
const IdleLanePriority = 2

const OffscreenLanePriority = 1

export const NoLanePriority = 0

const TotalLanes = 31

export const NoLanes = /*                        */ 0b0000000000000000000000000000000
export const NoLane = /*                          */ 0b0000000000000000000000000000000

export const SyncLane = /*                        */ 0b0000000000000000000000000000001
export const SyncBatchedLane = /*                 */ 0b0000000000000000000000000000010

export const InputDiscreteHydrationLane = /*      */ 0b0000000000000000000000000000100
const InputDiscreteLanes = /*                    */ 0b0000000000000000000000000011000

const InputContinuousHydrationLane = /*           */ 0b0000000000000000000000000100000
const InputContinuousLanes = /*                  */ 0b0000000000000000000000011000000

export const DefaultHydrationLane = /*            */ 0b0000000000000000000000100000000
export const DefaultLanes = /*                   */ 0b0000000000000000000111000000000

const TransitionHydrationLane = /*                */ 0b0000000000000000001000000000000
const TransitionLanes = /*                       */ 0b0000000001111111110000000000000

const RetryLanes = /*                            */ 0b0000011110000000000000000000000

export const SomeRetryLanes = /*                  */ 0b0000010000000000000000000000000

export const SelectiveHydrationLane = /*          */ 0b0000100000000000000000000000000

const NonIdleLanes = /*                                 */ 0b0000111111111111111111111111111

export const IdleHydrationLane = /*               */ 0b0001000000000000000000000000000
const IdleLanes = /*                             */ 0b0110000000000000000000000000000

export const OffscreenLane = /*                   */ 0b1000000000000000000000000000000

export const NoTimestamp = -1

let currentUpdateLanePriority = NoLanePriority
let return_highestLanePriority = DefaultLanePriority

function getLowestPriorityLane(lanes) {
  const index = 31 - Math.clz32(lanes)
  return index < 0 ? NoLane : 1 << index
}

function getEqualOrHigherPriorityLanes(lanes) {
  return (getLowestPriorityLane(lanes) << 1) - 1
}


function getHighestPriorityLanes(lanes) {
  if((SyncLane & lanes) !== NoLanes) {
    return_highestLanePriority = SyncLanePriority
    return SyncLane
  }
  if((SyncBatchedLane & lanes) !== NoLanes) {
    return_highestLanePriority = SyncBatchedLanePriority
  }

  if ((InputDiscreteHydrationLane & lanes) !== NoLanes) {
    return_highestLanePriority = InputDiscreteHydrationLanePriority
    return InputDiscreteHydrationLane
  }
  const inputDiscreteLanes = InputDiscreteLanes & lanes
  if (inputDiscreteLanes !== NoLanes) {
    return_highestLanePriority = InputDiscreteLanePriority
    return inputDiscreteLanes
  }
  if ((lanes & InputContinuousHydrationLane) !== NoLanes) {
    return_highestLanePriority = InputContinuousHydrationLanePriority
    return InputContinuousHydrationLane
  }
  const inputContinuousLanes = InputContinuousLanes & lanes
  if (inputContinuousLanes !== NoLanes) {
    return_highestLanePriority = InputContinuousLanePriority
    return inputContinuousLanes
  }
  if ((lanes & DefaultHydrationLane) !== NoLanes) {
    return_highestLanePriority = DefaultHydrationLanePriority
    return DefaultHydrationLane
  }
  const defaultLanes = DefaultLanes & lanes
  if (defaultLanes !== NoLanes) {
    return_highestLanePriority = DefaultLanePriority
    return defaultLanes
  }
  if ((lanes & TransitionHydrationLane) !== NoLanes) {
    return_highestLanePriority = TransitionHydrationPriority
    return TransitionHydrationLane
  }
  const transitionLanes = TransitionLanes & lanes
  if (transitionLanes !== NoLanes) {
    return_highestLanePriority = TransitionPriority
    return transitionLanes
  }
  const retryLanes = RetryLanes & lanes
  if (retryLanes !== NoLanes) {
    return_highestLanePriority = RetryLanePriority
    return retryLanes
  }
  if (lanes & SelectiveHydrationLane) {
    return_highestLanePriority = SelectiveHydrationLanePriority
    return SelectiveHydrationLane
  }
  if ((lanes & IdleHydrationLane) !== NoLanes) {
    return_highestLanePriority = IdleHydrationLanePriority
    return IdleHydrationLane
  }
  const idleLanes = IdleLanes & lanes
  if (idleLanes !== NoLanes) {
    return_highestLanePriority = IdleLanePriority
    return idleLanes
  }
  if ((OffscreenLane & lanes) !== NoLanes) {
    return_highestLanePriority = OffscreenLanePriority
    return OffscreenLane
  }
  // This shouldn't be reachable, but as a fallback, return the entire bitmask.
  return_highestLanePriority = DefaultLanePriority
  return lanes
}

export function createLaneMap(initial) {
  const laneMap = []
  for (let i = 0; i < TotalLanes; i++) {
    laneMap.push(initial)
  }
  return laneMap
}

export function mergeLanes(a, b) {
  return a | b
}
function pickArbitraryLaneIndex(lanes) {
  return 31 - Math.clz32(lanes)
}
function laneToIndex(lane) {
  return pickArbitraryLaneIndex(lane)
}

export function markRootUpdated(root, updateLane, eventTime) {
  root.pendingLanes |= updateLane
  let higherPriorityLanes = updateLane - 1  // Turns 0b1000 into 0b0111

  root.suspendedLanes &= higherPriorityLanes
  root.pingedLanes &= higherPriorityLanes

  const eventTimes = root.eventTimes
  const index = laneToIndex(updateLane)
  // We can always overwrite an existing timestamp because we prefer the most
  // recent event, and we assume time is monotonically increasing.
  eventTimes[index] = eventTime

}
export function includesSomeLane(a, b) {
  return (a & b) !== NoLanes
}

export function getNextLanes(root, wipLanes) {
  const pendingLanes = root.pendingLanes
  if (pendingLanes === NoLanes) {
    return_highestLanePriority = NoLanePriority
    return NoLanes
  }

  let nextLanes = NoLanes
  let nextLanePriority = NoLanePriority

  const expiredLanes = root.expiredLanes
  const suspendedLanes = root.suspendedLanes
  const pingedLanes = root.pingedLanes

  // Check if any work has expired.
  if (expiredLanes !== NoLanes) {
    nextLanes = expiredLanes
    nextLanePriority = return_highestLanePriority = SyncLanePriority
  } else {
    // Do not work on any idle work until all the non-idle work has finished,
    // even if the work is suspended.
    const nonIdlePendingLanes = pendingLanes & NonIdleLanes
    if (nonIdlePendingLanes !== NoLanes) {
      const nonIdleUnblockedLanes = nonIdlePendingLanes & ~suspendedLanes
      if (nonIdleUnblockedLanes !== NoLanes) {
        nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes)
        nextLanePriority = return_highestLanePriority
      } else {
        const nonIdlePingedLanes = nonIdlePendingLanes & pingedLanes
        if (nonIdlePingedLanes !== NoLanes) {
          nextLanes = getHighestPriorityLanes(nonIdlePingedLanes)
          nextLanePriority = return_highestLanePriority
        }
      }
    } else {
      // The only remaining work is Idle.
      const unblockedLanes = pendingLanes & ~suspendedLanes
      if (unblockedLanes !== NoLanes) {
        nextLanes = getHighestPriorityLanes(unblockedLanes)
        nextLanePriority = return_highestLanePriority
      } else {
        if (pingedLanes !== NoLanes) {
          nextLanes = getHighestPriorityLanes(pingedLanes)
          nextLanePriority = return_highestLanePriority
        }
      }
    }
  }

  if (nextLanes === NoLanes) {
    // This should only be reachable if we're suspended
    // TODO: Consider warning in this path if a fallback timer is not scheduled.
    return NoLanes
  }

  // If there are higher priority lanes, we'll include them even if they
  // are suspended.
  nextLanes = pendingLanes & getEqualOrHigherPriorityLanes(nextLanes)

  // If we're already in the middle of a render, switching lanes will interrupt
  // it and we'll lose our progress. We should only do this if the new lanes are
  // higher priority.
  if (
    wipLanes !== NoLanes &&
    wipLanes !== nextLanes &&
    // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (wipLanes & suspendedLanes) === NoLanes
  ) {
    getHighestPriorityLanes(wipLanes)
    const wipLanePriority = return_highestLanePriority
    if (nextLanePriority <= wipLanePriority) {
      return wipLanes
    } else {
      return_highestLanePriority = nextLanePriority
    }
  }

  // Check for entangled lanes and add them to the batch.
  //
  // A lane is said to be entangled with another when it's not allowed to render
  // in a batch that does not also include the other lane. Typically we do this
  // when multiple updates have the same source, and we only want to respond to
  // the most recent event from that source.
  //
  // Note that we apply entanglements *after* checking for partial work above.
  // This means that if a lane is entangled during an interleaved event while
  // it's already rendering, we won't interrupt it. This is intentional, since
  // entanglement is usually "best effort": we'll try our best to render the
  // lanes in the same batch, but it's not worth throwing out partially
  // completed work in order to do it.
  //
  // For those exceptions where entanglement is semantically important, like
  // useMutableSource, we should ensure that there is no partial work at the
  // time we apply the entanglement.
  const entangledLanes = root.entangledLanes
  if (entangledLanes !== NoLanes) {
    const entanglements = root.entanglements
    let lanes = nextLanes & entangledLanes
    while (lanes > 0) {
      const index = pickArbitraryLaneIndex(lanes)
      const lane = 1 << index

      nextLanes |= entanglements[index]

      lanes &= ~lane
    }
  }

  return nextLanes
}

export function isSubsetOfLanes(set, subset) {
  return (set & subset) === subset
}