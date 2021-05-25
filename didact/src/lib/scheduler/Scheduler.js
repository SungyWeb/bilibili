import {
  NormalPriority,
  ImmediatePriority,
  UserBlockingPriority,
  LowPriority,
  IdlePriority,
} from './SchedulerPriorities'

let currentPriorityLevel = NormalPriority


function getCurrentTime() {
  return performance.now()
}


function unstable_cancelCallback(task) {
  task.callback = null
}

function unstable_getCurrentPriorityLevel() {
  return currentPriorityLevel
}


function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break
    default:
      priorityLevel = NormalPriority
  }

  var previousPriorityLevel = currentPriorityLevel
  currentPriorityLevel = priorityLevel

  try {
    return eventHandler()
  } finally {
    currentPriorityLevel = previousPriorityLevel
  }
}

const Scheduler = {
  unstable_runWithPriority,
  unstable_cancelCallback,
  unstable_now: getCurrentTime,
  unstable_getCurrentPriorityLevel,
  unstable_ImmediatePriority: ImmediatePriority,
  unstable_UserBlockingPriority: UserBlockingPriority,
  unstable_NormalPriority: NormalPriority,
  unstable_IdlePriority: IdlePriority,
  unstable_LowPriority: LowPriority,
}

export default Scheduler