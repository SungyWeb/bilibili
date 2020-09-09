const BaseService = require('./base')
const TableName = 'role_resource'
class RoleResourceService extends BaseService {
  constructor(...args) {
    super(...args)
    this.entity = TableName
  }
}

module.exports = RoleResourceService
