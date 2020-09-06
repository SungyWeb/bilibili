const BaaseController = require('./base')
const ServiceName = 'roleResource'
class RoleController extends BaaseController {
    constructor(...args) {
        super(...args)
        this.entity = ServiceName
    }
}

module.exports = RoleController