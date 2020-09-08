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
    async setResource() {
        const { app, ctx, service } = this
        const body = ctx.request.body   // {roleId: 1, resourceIds: [1,2,3]}
        await service[this.entity].setResource(body)
        this.success('授权成功')
    }
    async getUser() {
        const { app, ctx, service } = this
        const result = await service[this.entity].getUser()
        ctx.body = result
    }
    async setUser() {
        const { app, ctx, service } = this
        const body = ctx.request.body   // {roleId: 1, UserIds: [1,2,3]}
        await service[this.entity].setUser(body)
        this.success('授权成功')
    }
}

module.exports = RoleController