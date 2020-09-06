const BaseService = require('./base')
const TableName = 'resource'
class ResourceService extends BaseService {
    constructor(...args) {
        super(...args)
        this.entity = TableName
    }
}

module.exports = ResourceService