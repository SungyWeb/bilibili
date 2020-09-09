'use strict'
const BaseService = require('./base')
const TableName = 'role'
function listToTree(list) {
  const map = {}
  const root = []
  list.forEach(v => {
    v.children = []
    map[v.id] = v
    if (v.parent_id === 0) {
      root.push(v)
    } else {
      map[v.parent_id].children.push(v)
    }
  })
  return root
}
class RoleService extends BaseService {
  constructor(...args) {
    super(...args)
    this.entity = TableName
  }
  async getResource() {
    const { app } = this
    const resource = await app.mysql.select('resource')
    return listToTree(resource)
  }
  async setResource({ roleId, resourceIds }) {
    const { app } = this
    // 先全部删除 再从新写入
    await app.mysql.query(`DELETE FROM role_resource WHERE role_id=?`, [roleId])
    for (let i = 0; i < resourceIds.length; i++) {
      const resourId = resourceIds[i]
      await app.mysql.insert('role_resource', {
        role_id: roleId,
        resource_id: resourId
      })
    }
  }
  async getUser() {
    const { app } = this
    const result = await app.mysql.select('resource')
    return result
  }
  async setUser({ roleId, userIds }) {
    const { app } = this
    // 先全部删除 再从新写入
    await app.mysql.query(`DELETE FROM role_user WHERE role_id=?`, [roleId])
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i]
      await app.mysql.insert('role_user', {
        role_id: roleId,
        user_id: userId
      })
    }
  }
}

module.exports = RoleService