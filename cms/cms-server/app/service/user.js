const BaseService = require('./base')
const TableName = 'user'
class UserService extends BaseService {
    constructor(...args) {
        super(...args)
        this.entity = TableName
    }
}

module.exports = UserService