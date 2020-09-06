const BaaseController = require('./base')
const ServiceName = 'role'

class RoleController extends BaaseController {
    constructor(...args) {
        super(...args)
        this.entity = ServiceName
    }
    async getResource() {
        const { app, ctx, service } = this
        const result = await service[this.entity].getResource()
        ctx.body = result
    }
}

module.exports = RoleController