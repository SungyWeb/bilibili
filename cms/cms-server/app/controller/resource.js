const BaaseController = require('./base')
const ServiceName = 'resource'
class ResourceController extends BaaseController {
    constructor(...args) {
        super(...args)
        this.entity = ServiceName
    }
}

module.exports = ResourceController