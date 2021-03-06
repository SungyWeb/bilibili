import Scheduler from '../scheduler/Scheduler'


// Except for NoPriority, these correspond to Scheduler priorities. We use
// ascending numbers so we can compare them like numbers. They start at 90 to
// avoid clashing with Scheduler's priorities.
export const ImmediatePriority = 99
export const UserBlockingPriority = 98
export const NormalPriority = 97
export const LowPriority = 96
export const IdlePriority = 95
// NoPriority is the absence of priority. Also React-only.
export const NoPriority = 90


const {
  unstable_runWithPriority: Scheduler_runWithPriority,
  unstable_cancelCallback: Scheduler_cancelCallback,
  unstable_now: Scheduler_now,
  unstable_getCurrentPriorityLevel: Scheduler_getCurrentPriorityLevel,
  unstable_ImmediatePriority: Scheduler_ImmediatePriority,
  unstable_UserBlockingPriority: Scheduler_UserBlockingPriority,
  unstable_NormalPriority: Scheduler_NormalPriority,
  unstable_LowPriority: Scheduler_LowPriority,
  unstable_IdlePriority: Scheduler_IdlePriority,
} = Scheduler


function reactPriorityToSchedulerPriority(reactPriorityLevel) {
  switch (reactPriorityLevel) {
    case ImmediatePriority:
      return Scheduler_ImmediatePriority
    case UserBlockingPriority:
      return Scheduler_UserBlockingPriority
    case NormalPriority:
      return Scheduler_NormalPriority
    case LowPriority:
      return Scheduler_LowPriority
    case IdlePriority:
      return Scheduler_IdlePriority
    default:
      console.error( 'Unknown priority level.')
  }
}

const initialTimeMs = performance.now()
export const now = initialTimeMs < 10000 ? Scheduler_now : () => Scheduler_now() - initialTimeMs

let immediateQueueCallbackNode = null

export function flushSyncCallbackQueue() {
  if (immediateQueueCallbackNode !== null) {
    const node = immediateQueueCallbackNode
    immediateQueueCallbackNode = null
    Scheduler_cancelCallback(node)
  }
  flushSyncCallbackQueueImpl()
}

function flushSyncCallbackQueueImpl() {
  // todo
}

export function runWithPriority(reactPriorityLevel, fn) {
  const priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel)
  return Scheduler_runWithPriority(priorityLevel, fn)
}


export function getCurrentPriorityLevel() {
  switch(Scheduler_getCurrentPriorityLevel()) {
    case Scheduler_ImmediatePriority:
      return ImmediatePriority
    case Scheduler_UserBlockingPriority:
      return UserBlockingPriority
    case Scheduler_NormalPriority:
      return NormalPriority
    case Scheduler_LowPriority:
      return LowPriority
    case Scheduler_IdlePriority:
      return IdlePriority
    default:
      console.log('Unknown priority level.')
  }
}