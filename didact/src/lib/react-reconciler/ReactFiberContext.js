import { createCursor } from './ReactFiberStack'

const emptyContextObject = {}
const didPerformWorkStackCursor = createCursor(emptyContextObject)
function hasContextChanged() {
  return didPerformWorkStackCursor.current
}

export {
  hasContextChanged,
}