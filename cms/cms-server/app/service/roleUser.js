const BaseService = require('./base')
const TableName = 'role_user'
class RoleUserService extends BaseService {
    constructor(...args) {
        super(...args)
        this.entity = TableName
    }
}


module.exports = RoleUserService