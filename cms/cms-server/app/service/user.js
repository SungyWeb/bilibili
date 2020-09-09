const BaseService = require('./base')
const TableName = 'user'
class UserService extends BaseService {
  constructor(...args) {
    super(...args)
    this.entity = TableName
  }
  async list(pageSize, pageNum, where) {
    const list = await this.app.mysql.select(this.entity, {
      where,
      order: [['id', 'asc']],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    })
    const count = await this.app.mysql.count(this.entity, where)
    for (let i = 0; i < list.length; i++) {
      const user = list[i];
      const resourceArr = await this.app.mysql.query(`
        SELECT resource.* from resource
        INNER JOIN role_resource ON resource.id = role_resource.resource_id
        INNER JOIN role_user ON role_resource.role_id = role_user.role_id
        WHERE role_user.user_id = ?
      `, user.id)
      user.resources = resourceArr
    }
    return {
      count,
      list,
    }
  }
}

module.exports = UserService