const BaaseController = require('./base')
const ServiceName = 'user'
class UserController extends BaaseController {
    constructor(...args) {
        super(...args)
        this.entity = ServiceName
    }
}

module.exports = UserController