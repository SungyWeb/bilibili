class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload
    this.nextUpdate = nextUpdate
  }
}
class UpdateQuene {
  constructor() {
    this.baseState = null
    this.firstUpdate = null
    this.lastUpdate = null
  }
  addUpdate(update) {
    if(this.firstUpdate === null) {
      this.firstUpdate = this.lastUpdate = update
    }else {
      this.lastUpdate.nextUpdate = update   // 上一个节点的nextUpdate 指向新增节点
      this.lastUpdate = update    // 修改最后节点为 新增节点
    }
  }
  forceUpdate() {
    let curState = this.baseState || {}
    let curUpdate = this.firstUpdate
    while(curUpdate) {
      const nextState = typeof curUpdate.payload === 'function' ? curUpdate.payload(curState) : curUpdate.payload
      curState = {...curState, ...nextState}  // 更新curState
      curUpdate = curUpdate.nextUpdate   // 更新curUpdate 为下一个节点，当curUpdate为null时，停止循环
    }
    this.firstUpdate = this.lastUpdate = null   // 循环结束，清空列表
    this.baseState = curState   // 将最新的curState 赋值给 baseState
    return curState
  }
}

let quene = new UpdateQuene()
quene.addUpdate(new Update({name: 'a'}))
quene.addUpdate(new Update({number: 1}))
quene.addUpdate(new Update(state => ({number: state.number+1})))
quene.addUpdate(new Update(state => ({number: state.number+1})))
const state = quene.forceUpdate()   // state = { name: 'a', number: 3 }