const BaaseController = require('./base')
const ServiceName = 'roleUser'

class RoleUserController extends BaaseController {
    constructor(...args) {
        super(...args)
        this.entity = ServiceName
    }
}

module.exports = RoleUserController