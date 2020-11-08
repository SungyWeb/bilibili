export class Update {
  constructor(payload) {
    this.payload = payload
  }
}
export class UpdateQueue {
  constructor() {
    this.firstUpdate = null
    this.lastUdpdate = null
  }
  enqueueUpdate(update) {
    if (this.lastUdpdate === null) {
      this.firstUpdate = this.lastUdpdate = null
    } else {
      this.lastUdpdate.nextUpdate = update
      this.lastUdpdate = update
    }
  }
  forceUpdate(state) {
    let currentUpdate = this.firstUpdate
    while (currentUpdate) {
      let nextState = typeof currentUpdate.payload === 'function' ? currentUpdate.payload(state) : currentUpdate.payload
      state = { ...state, ...nextState }
    }
    this.firstUpdate = this.lastUdpdate = null
    return state
  }
}